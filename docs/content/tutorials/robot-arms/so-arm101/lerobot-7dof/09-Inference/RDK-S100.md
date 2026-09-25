---
title: "D-Robotics RDK S100 Inference"
description: "Run 7-DOF SO-ARM101 inference on the D-Robotics RDK S100 controller, following the vendor's LeRobot ACT policy workflow."
---

# D-Robotics RDK S100 Inference

For the detailed implementation workflow, refer to this link [LeRobot ACT Policy Full Process Documentation](https://horizonrobotics.feishu.cn/docx/HSr8dBdZ0oQ5OwxPQvBcsuyZnWe)



## End-to-End Deployment of the ACT Model on the RDK S100/S100P

This section will walk you through the complete deployment loop of the ACT model on D-Robotics RDK S100 series hardware. The whole process is divided into three core stages: **model export**, **quantization and compilation**, and **running on the board**.

**Prerequisites:**

- **Development machine \(Host\):** used to execute steps 1 and 2; usually your model training machine (it needs decent performance and Docker installed).

- **Board side \(Edge\):** D-Robotics RDK S100/S100P, used to execute step 3.

- **Toolchain:** this article relies on the `rdk_LeRobot_tools` repository; for details, refer to the [GitHub repository address](https://github.com/D-Robotics/rdk_LeRobot_tools).

**Important version compatibility note \(required reading\):** the ONNX export workflow of the current version of `rdk_LeRobot_tools` is perfectly compatible with **LeRobot datasets v2\.1**. Because the latest v3\.0 version has changes to the data structure, it is **strongly recommended** that before carrying out the operations in this chapter, you switch the original `lerobot` main repository to a specific commit compatible with v2\.1, to ensure a smooth export workflow. 

*Recommended Commit ID:* `8cfab3882480bdde38e42d93a9752de5ed42cae2`



### Stage 1: Export the Model to ONNX Format 💻 \(performed on the development machine\)

First, we need to export the ** PyTorch-trained ** model to an intermediate format (ONNX).



#### **1\. Clone the toolchain repository** 

Enter your `lerobot` working directory and clone the RDK dedicated toolchain:

```Bash
cd lerobot

# 1. Switch to a stable version compatible with v2.1 datasets
git checkout 8cfab3882480bdde38e42d93a9752de5ed42cae2

# 2. Clone the D-Robotics RDK dedicated toolchain
git clone https://github.com/D-Robotics/rdk_LeRobot_tools.git
```



#### **2\. Configure the export parameters** 

Edit the `rdk_LeRobot_tools/bpu_export_config.yaml` file and modify the configuration according to your actual paths:

```YAML
dataset:
  root: "data/so101_pick_place" # The absolute or relative path of your dataset
act_path: "outputs/train/act_so101/checkpoints/050000/pretrained_model" # The path of the original PyTorch model weights
type: "nash-e" # Target hardware architecture: RDK S100 corresponds to nash-e / S100P corresponds to nash-m
```



#### 3\. Run the export script

```Bash
# Export ONNX (development machine)
python export_bpu_actpolicy.py --config bpu_export_config.yaml
```

✅ **Success indicator**: a `bpu_export_output` folder is generated in the current directory, containing the `build_all.sh` script and the quantization calibration data needed later.



### Stage 2: Compile the BPU Model 🐳 \(performed in the Docker environment on the development machine\)

Quantization and compilation of the D-Robotics BPU model relies on the OpenExplorer \(OE\) environment. We recommend using Docker to isolate the environment.



#### **1\.** **Prepare the Docker environment and image** 

Make sure Docker is installed on the development machine ([official installation guide](https://docs.docker.com/engine/install/)). Download the recommended CPU image and load it:

```Bash
# Load the downloaded offline image archive
sudo docker load -i ai_toolchain_ubuntu_22_s100_xxx.tar
```



#### **2\. Start the compilation container**

**Pitfall warning**: compiling the model requires a fairly large shared memory. Be sure to add the `--shm-size=15g` argument, otherwise IPC memory errors are very likely.

Mount the development machine's working directory (including the folder just exported) into the container:

```Bash
sudo docker run -it --rm \
  --network host \
  --shm-size=15g \
  -v "$(pwd)":/workspace \
  --workdir /workspace \
  <docker-image-name> /bin/bash
```

\(Note: replace `<docker-image-name>` with the actual image name you see via `sudo docker images`.\)



#### **3\.** **Run the compilation inside the container** 

After entering the container, run the one-click compilation script:

```Bash
cd /workspace/bpu_export_output
bash build_all.sh
```



#### **4\.** **Check the compilation artifacts** 

After compilation is complete, a `bpu_output/` folder is generated under `bpu_export_output`. It contains all the core files needed to run on the RDK board: 

- Click to view the `bpu_output/` directory structure

    - `BPU_ACTPolicy_TransformerLayers.hbm` \(quantized model file\)

    - `BPU_ACTPolicy_VisionEncoder.hbm` \(quantized model file\)

    - `action_mean.npy` and other dataset normalization parameters

    - `camera1_mean.npy` and other camera statistics parameters

---

### Stage 3: Deployment and Inference on the Board 🤖 \(performed on the RDK S100\)

**Prerequisite checks:**

1. The `D-Robotics/lerobot` runtime environment has been configured on the RDK board, and `hbm_runtime` has been installed.

2. The entire `bpu_output/` folder generated in the previous step has been fully copied to the RDK board via `scp`, a USB drive, or similar.

3. The basic teleoperation configuration has been completed, making sure that the robotic arm serial port, camera USB port, and calibration files are configured correctly.



#### **1\.** **Run BPU-accelerated inference**

On the RDK board terminal, enter the toolchain directory and start the control script:

```Bash
cd rdk_LeRobot_tools

python bpu_control_robot.py \
  --bpu-act-path ../bpu_output \
  --fps 30 \
  --inference-time 60
```



---

### 🛠️ Common Fault Troubleshooting

If you run into problems during actual deployment, check against the following list:

- **The robotic arm does not move?**

    - Check the device mounting: run `ls /dev/ttyACM*` in the terminal to confirm the serial port number corresponding to the robotic arm is correct.

    - Check permissions: try running the inference script with `sudo`, or add the current user to the `dialout` group.

- **Camera stream errors / abnormal image / robotic arm shaking in place?**

    - Confirm whether the camera index (Camera Index) has drifted due to hot-plugging, and check whether the camera parameter configuration in the code matches the actual `/dev/video*`.

- **"Permission denied" when copying container-generated files on the development machine?**

    - Files created in a Docker-mounted directory are owned by root by default; run `sudo chown -R $USER:$USER bpu_export_output` on the development machine to fix it.

