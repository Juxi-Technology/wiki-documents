<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const T: Record<string, { title: string; text: string }> = {
  'zh-CN': {
    title: '使用提醒',
    text: '请勿连续工作超过 1 小时，否则舵机过热易烧坏电机。抓取完毕后需恢复原位，请勿保持驱动受力动作，以免持续驱动受力过热损坏。',
  },
  'zh-HK': {
    title: '使用提醒',
    text: '請勿連續工作超過 1 小時，否則舵機過熱易燒壞馬達。抓取完畢後需恢復原位，請勿保持驅動受力動作，以免持續驅動受力過熱損壞。',
  },
  en: {
    title: 'Safety notice',
    text: 'Do not operate continuously for more than 1 hour — overheated servos can burn out the motors. After grasping, return the arm/hand to its home position; do not leave the servos energized under load, as sustained load can cause overheating and damage.',
  },
  ja: {
    title: 'ご使用上の注意',
    text: '連続して 1 時間以上動作させないでください。サーボが過熱しモーターが焼損する恐れがあります。把持後は元の位置に戻し、駆動に力を加えたままにしないでください。負荷をかけ続けると過熱し破損します。',
  },
  ko: {
    title: '사용 주의',
    text: '1시간 이상 연속 작동하지 마십시오. 서보가 과열되면 모터가 소손될 수 있습니다. 파지 후에는 원위치로 복귀하고, 구동에 힘이 가해진 상태로 두지 마십시오. 지속적인 부하로 과열 및 손상될 수 있습니다.',
  },
  de: {
    title: 'Sicherheitshinweis',
    text: 'Nicht länger als 1 Stunde ununterbrochen betreiben – überhitzte Servos können die Motoren durchbrennen. Nach dem Greifen in die Ausgangsposition zurückfahren; die Servos nicht unter Last stehen lassen, da Dauerlast zu Überhitzung und Schäden führt.',
  },
  fr: {
    title: "Avis d'utilisation",
    text: "Ne pas faire fonctionner plus d'une heure en continu : des servos en surchauffe peuvent griller les moteurs. Après la préhension, revenez à la position d'origine ; ne laissez pas les servos sous charge, une charge continue pouvant provoquer une surchauffe et des dommages.",
  },
  es: {
    title: 'Aviso de uso',
    text: 'No operar de forma continua más de 1 hora; unos servos sobrecalentados pueden quemar los motores. Tras el agarre, vuelva a la posición de origen; no deje los servos bajo carga, ya que la carga continua puede causar sobrecalentamiento y daños.',
  },
  it: {
    title: "Avviso d'uso",
    text: 'Non far funzionare il dispositivo per più di 1 ora in modo continuo: servi surriscaldati possono bruciare i motori. Dopo la presa, riportare in posizione di riposo; non lasciare i servi sotto carico, perché il carico continuo può causare surriscaldamento e danni.',
  },
  'pt-BR': {
    title: 'Aviso de uso',
    text: 'Não opere continuamente por mais de 1 hora; servos superaquecidos podem queimar os motores. Após a preensão, retorne à posição original; não deixe os servos sob carga, pois a carga contínua pode causar superaquecimento e danos.',
  },
  'pt-PT': {
    title: 'Aviso de utilização',
    text: 'Não opere continuamente durante mais de 1 hora; servos sobreaquecidos podem queimar os motores. Após a preensão, regresse à posição original; não deixe os servos sob carga, pois a carga contínua pode causar sobreaquecimento e danos.',
  },
}

const t = computed(() => T[lang.value] || T.en)
</script>

<template>
  <div class="servo-safety" role="note">
    <span class="servo-safety-icon" aria-hidden="true">⚠️</span>
    <div class="servo-safety-body">
      <p class="servo-safety-title">{{ t.title }}</p>
      <p class="servo-safety-text">{{ t.text }}</p>
    </div>
  </div>
</template>

<style scoped>
.servo-safety {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 18px 0 24px;
  padding: 14px 16px;
  border: 1px solid rgba(230, 167, 0, 0.35);
  border-left: 4px solid #e6a700;
  border-radius: 10px;
  background: var(--vp-c-warning-soft, #fff8e6);
}

.dark .servo-safety {
  background: rgba(230, 167, 0, 0.12);
  border-color: rgba(230, 167, 0, 0.4);
}

.servo-safety-icon {
  font-size: 18px;
  line-height: 1.4;
}

.servo-safety-body {
  min-width: 0;
}

.servo-safety-title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-warning-1, #b47900);
}

.servo-safety-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}
</style>
