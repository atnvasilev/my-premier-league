<template>
  <div class="container container--tall container--max-width">
    <div class="login">
      <form class="form" @submit.prevent="register">
        <label class="form-row">
          <div class="form-input">
            <input placeholder="E-mail" type="text" v-model="form.email" />
          </div>
        </label>

        <label class="form-row" style="display:block;margin-top:12px;">
          <div class="form-input">
            <input placeholder="Парола" type="password" v-model="form.password" />
          </div>
        </label>

        <div class="form-row form-row--errors"></div>

        <div class="form-row form-row--actions" style="display:block;margin-top:12px;">
          <button style="background:#3498db;">Регистрация</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("registerUserWithEmailAndPssword", this.form)
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => alert(error.message));
    }
  },
  created() {
    this.$emit('ready');
  }
}
</script>

<style scoped>
.login {
  max-width: 360px;
  margin: auto;
}

.login-page .nav {
  display: none;
}

.login-page .header__block {
  text-align: center;
  justify-content: center;
}

.login-page .header__logo {
  margin-bottom: 0;
}

.login-page .footer {
  text-align: center;
}

.login {
  text-align: center;
}

.login input {
  text-align: center;
  padding: 12px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  -moz-appearance: none;
  appearance: none;
  font: inherit;
  font-size: 16px;
  -webkit-appearance: none;
  border-radius: 30px;
  outline: 0 none !important;
}

.login button {
  background: #2ecc71;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 20px;
  display: block;
  width: 100%;
  font-family: inherit;
  border: 0 none;
  outline: 0 none !important;
}
</style>
