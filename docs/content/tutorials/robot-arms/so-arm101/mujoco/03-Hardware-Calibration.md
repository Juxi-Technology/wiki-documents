---
title: "03 · Real-Robot Connection and Calibration"
description: "Once the driver board with the CH343 chip is plugged in, a COM port appears; the number changes with replugging/switching USB ports, so confirm it before eve…"
---

# 03 · Real-Robot Connection and Calibration

> Prerequisite: complete [01 Environment Setup](/tutorials/robot-arms/so-arm101/mujoco/01-Environment) (the `feetech` extra provides serial communication).
> Example ports in this chapter: follower arm `COM172`, leader arm `COM124` (measured values for the leader arm currently in use on this machine)—**the number may change on every replug,
> so always use the actual port found in the first step**; in the commands below, just replace the port with your own number.

## Identifying the Serial Port

Once the driver board with the CH343 chip is plugged in, a COM port appears; the number changes with replugging/switching USB ports, so confirm it before every connection:

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen python -c "import serial.tools.list_ports as lp; [print(p.device, '|', p.description, '|', p.hwid) for p in lp.comports()]"
```

The line in the output that shows `CH343` (or a similar USB serial device) is the driver board; note its `COM` number.

## Step 1: Read-Only Initial Check (Wiring/Power/Servo Health Check)

**Without writing anything**, first ping all six servos one by one, then read voltage and temperature (torque state is left as-is):

```bash
uv run --frozen python examples/so101_mujoco/hardware_check.py --port COM172   # 换成你查到的端口
```

`--port` is the number found in the first step; fill in whichever port corresponds to the arm to be checked (the same script works for both the follower and leader arms).

Normal output looks like: six joint lines, temperature 20–30 °C, torque 0 (arm free). **Voltage depends on the power supply**: about 11V when the follower arm is on an external
power supply, and about 5V when the leader arm is powered only by the driver board—being able to read all six servos means the wiring is normal. Missing servos or a model mismatch
cause an immediate error.

## Step 2: Calibration

Calibration writes "each joint's travel range + mid-position reference" into the servo EEPROM and saves it to a local file; **the follower arm and the leader arm must each be calibrated once**.
The two arms' calibration files are stored separately and do not affect each other:

| Device | Command | Calibration file location |
| --- | --- | --- |
| Follower arm | `uv run --frozen lerobot-calibrate --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101` | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/juxi_so101.json` |
| Leader arm | `uv run --frozen lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM124 --teleop.id=juxi_leader` | `.../calibration/teleoperators/so_leader/juxi_leader.json` |

The meaning of each parameter in the commands:

| Parameter | Description |
| --- | --- |
| `--robot.type=so101_follower` / `--teleop.type=so101_leader` | Role of the calibration target: follower arm / leader arm (do not mix up the roles; calibration files are stored in separate directories by role) |
| `--robot.port` / `--teleop.port` | The serial port number found in the first step |
| `--robot.id` / `--teleop.id` | A name for this arm (in this example `juxi_so101` / `juxi_leader`); **teleoperation/recording must use the same id afterwards**, otherwise calibration will be requested again |

`id` can be any name, but the two arms' calibrations are independent and do not overwrite each other.

### Physical Steps (the Terminal Prints a Diagram)

1. **Pose it at the mid-position, then press Enter**: place the base flat at the edge of the desk, upper arm vertical and up, forearm horizontal and forward, shoulder rotation and wrist centered
   (the leader arm's "gripper" is the handle/trigger). The position at this moment is recorded as that arm's "mid-position reference".
2. After pressing Enter, **slowly sweep each joint through its full range of motion** (`wrist_roll` does not need sweeping; it is automatically treated as a full turn), then press Enter to save.

Notes:

- During follower-arm calibration the torque is 0 (the arm is limp); move it by hand. The leader arm has no torque in the first place.
- The calibration process writes to the servo EEPROM (this is part of calibration and is normal).
- Calibration results measured in this session (for comparison): the follower arm's joint travel is about 1474–2688 counts, wrist rotation (`wrist_roll`) 4095 counts;
  the leader arm about 2208–2681 counts. Noticeably asymmetric travel is normal (for the reason and compensation, see
  [05 Zero-Point Fine-Tuning](/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)).

<RelatedProducts slugs="so-arm101" />
