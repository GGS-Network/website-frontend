<template>
  <transition name="modal-fade">
    <div class="verification-modal-overlay" @click.self="$emit('close')">
      <div class="verification-modal" :class="{ 'show': true }">
        <div class="verification-header">
          <h2>Verifizierung erforderlich</h2>
          <p>Ein Verifizierungscode wurde an Ihre E-Mail-Adresse gesendet.</p>
        </div>

        <form @submit.prevent="verifyCode" class="verification-form">
          <div class="code-input-group">
            <input
              v-for="(digit, index) in 6"
              :key="index"
              type="text"
              maxlength="1"
              v-model="code[index]"
              @input="handleInput($event, index)"
              @keydown="handleKeydown($event, index)"
              @paste="handlePaste"
              ref="inputs"
            >
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div class="verification-actions">
            <button type="submit" class="verify-btn" :disabled="!isComplete || loading">
              <span v-if="!loading">Verifizieren</span>
              <div v-else class="spinner"></div>
            </button>
            
            <div class="resend-section">
              <p v-if="countdown > 0">
                Code erneut senden in {{ countdown }}s
              </p>
              <button 
                v-else 
                type="button" 
                class="resend-btn" 
                @click="resendCode"
                :disabled="resending"
              >
                Code erneut senden
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { auth } from '@/services/api';

export default {
  name: 'VerificationModal',
  props: {
    tempToken: {
      type: String,
      required: true
    }
  },
  emits: ['verified', 'error'],
  setup(props, { emit }) {
    const code = ref(Array(6).fill(''));
    const inputs = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const countdown = ref(60);
    const resending = ref(false);
    let countdownInterval;

    const isComplete = computed(() => {
      return code.value.every(digit => digit !== '');
    });

    const startCountdown = () => {
      countdown.value = 60;
      countdownInterval = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
    };

    const handleInput = (event, index) => {
      const value = event.target.value;
      if (value && index < 5) {
        inputs.value[index + 1].focus();
      }
    };

    const handleKeydown = (event, index) => {
      if (event.key === 'Backspace' && !code.value[index] && index > 0) {
        inputs.value[index - 1].focus();
      }
    };

    const handlePaste = (event) => {
      event.preventDefault();
      const pastedData = event.clipboardData.getData('text');
      const digits = pastedData.slice(0, 6).split('');
      digits.forEach((digit, index) => {
        if (/^\d$/.test(digit) && index < 6) {
          code.value[index] = digit;
        }
      });
    };

    const verifyCode = async () => {
      if (!isComplete.value) return;

      loading.value = true;
      error.value = null;

      try {
        const response = await auth.verifyCode(code.value.join(''), props.tempToken);
        emit('verified', response);
      } catch (err) {
        error.value = err.response?.data?.message || 'Verifizierung fehlgeschlagen';
        emit('error', error.value);
      } finally {
        loading.value = false;
      }
    };

    const resendCode = async () => {
      resending.value = true;
      try {
        await auth.resendCode(props.tempToken);
        startCountdown();
      } catch (err) {
        error.value = 'Code konnte nicht erneut gesendet werden';
      } finally {
        resending.value = false;
      }
    };

    onMounted(() => {
      startCountdown();
    });

    onUnmounted(() => {
      clearInterval(countdownInterval);
    });

    return {
      code,
      inputs,
      loading,
      error,
      countdown,
      resending,
      isComplete,
      handleInput,
      handleKeydown,
      handlePaste,
      verifyCode,
      resendCode
    };
  }
};
</script>

<style scoped>
.verification-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

.verification-modal {
  background: var(--color-white);
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(20px);
  opacity: 0;
  animation: slideUp 0.3s ease forwards;
  animation-delay: 0.1s;
}

.verification-header {
  text-align: center;
  margin-bottom: 30px;
}

.verification-header h2 {
  color: var(--color-primary);
  margin-bottom: 10px;
  font-size: 24px;
}

.verification-header p {
  color: var(--color-default);
  opacity: 0.7;
}

.code-input-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.3s ease;
}

.code-input-group input {
  width: 45px;
  height: 55px;
  border: 2px solid var(--color-light);
  border-radius: 12px;
  font-size: 24px;
  text-align: center;
  background: var(--color-light);
  transition: all 0.3s ease;
  transform: scale(1);
}

.code-input-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-white);
  box-shadow: 0 0 0 4px rgba(72, 52, 212, 0.1);
  transform: scale(1.05);
}

.verification-actions {
  text-align: center;
}

.verify-btn {
  width: 100%;
  padding: 12px;
  background: var(--gradient-primary);
  color: var(--color-white);
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.verify-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.verify-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.resend-section {
  margin-top: 20px;
}

.resend-section p {
  color: var(--color-default);
  opacity: 0.7;
  margin: 0;
}

.resend-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.resend-btn:hover:not(:disabled) {
  opacity: 0.8;
  text-decoration: underline;
}

.resend-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  margin: 15px 0;
  padding: 10px;
  background: rgba(231, 76, 60, 0.1);
  color: #c0392b;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid var(--color-white);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .verification-modal {
    padding: 20px;
    margin: 10px;
  }

  .code-input-group {
    gap: 8px;
  }

  .code-input-group input {
    width: 40px;
    height: 50px;
    font-size: 20px;
  }
}

@media (max-width: 360px) {
  .code-input-group input {
    width: 35px;
    height: 45px;
    font-size: 18px;
  }
}

/* Modal Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .verification-modal,
.modal-fade-leave-to .verification-modal {
  transform: translateY(20px);
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style> 