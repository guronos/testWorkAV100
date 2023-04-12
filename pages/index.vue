<template>
 <v-app>
  <main>
<div class="settings-header px-4"><p>Настройки</p></div>
<div class="px-4 pt-5 d-flex flex-column settings-section">
<div class="d-flex setting-block">
  <div class="setting-title">Звонок через SIP <v-switch
                v-model="switchSIP"
                color="success"
                value=true
                hide-details
                class="d-inline-block"
              ></v-switch></div>
  <div class="setting-body">Включите эту функцию чтобы Авито и другие площадки не блокировали ваш аккаунт. Будет выглядеть так, будто звонки совершаются с разных номеров.</div>
</div>
<div class="d-flex setting-block">
  <div class="setting-title">Учётная запись</div>
  <div class="">
      <div class="account-item"><div class="account-item_name">Компания</div><v-text-field
              label=""
              class="account-input"
              color="#66BB6A"
              outlined
            ></v-text-field></div>
      <div class="account-item"><div class="account-item_name">Логин</div><v-text-field
              label=""
              class="account-input"
              color="#66BB6A"
              outlined
            ></v-text-field></div>
      <div class="account-item"><div class="account-item_name">Номер телефона</div><v-text-field
              label=""
              class="account-input"
              color="#66BB6A"
              outlined
            ></v-text-field></div>
    <div class="account-item"><div class="account-item_name">Имя</div><v-text-field
              label=""
              class="account-input"
              color="#66BB6A"
              outlined
            ></v-text-field></div>
      <div class="account-item"><div class="account-item_name">Фамилия</div><div><v-text-field
              label=""
              class="account-input"
              color="#66BB6A"
              outlined
            ></v-text-field><div class="account-input-comment">* Не обязательно</div></div></div>
  </div>
</div>
<div class="d-flex setting-block">
  <div class="setting-title">
    Оповещения о новых подборках
  </div>
  <div class="d-flex flex-column">
  <div class="setting-body">
    Выберите, куда будут приходить уведомления при появлении автомобилей, которые подходят под критерии вашей подборки.
  </div>
  <div class="setting-notifications-header mt-5">Уведомления
    <v-radio-group
                v-model="selectNotification"
                column
                class="setting-notifications-radio"
              >
                <v-radio
                  label="Выкл"
                  color="primary"
                  value="off"
                  class="black--text"
                ></v-radio>
                <v-divider class="mb-2 pb-4"/>
                <v-radio
                  label="Push"
                  color="primary"
                  value="push"
                  disabled
                ></v-radio>
                <v-divider class="mb-2 pb-4"/>
                <v-radio
                  label="Email"
                  color="primary"
                  value="email"
                ></v-radio>
                <v-divider class="mb-2 pb-4"/>
                <v-radio
                  label="Telegram ID"
                  color="primary"
                  value="telegram"
                ></v-radio>
              </v-radio-group>
  </div></div>
</div>
<div class="d-flex setting-block">
  <div class="setting-title">
    Переход в карточку
  </div>
  <div class="setting-body">
    Выберите, каким образом будет открываться детальное представление выбранного вами транспорта.
  </div>
</div>
<div class="d-flex setting-block">
  <div class="setting-title">
    Прочие настройки
  </div>
  <div>
    
  </div>
</div>
</div>
</main>
 </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: 'IndexPage',
  data (){
    return {
      switchSIP : '',
      selectNotification: 'off',
    }
  },
  computed : {
    ...mapGetters(['getCounter'])
  }, methods : {
    ...mapMutations(['increment']),
    ...mapActions(['get'])
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600&family=Montserrat:wght@400;500;600&family=Open+Sans:wght@400;500;600&display=swap');
*{
  font-family: 'Montserrat', 'Dosis', 'Open Sans', sans-serif;
}
html {
  font-size: 10px;
}
.settings-header {
background: #f9f9fc;
font-size: 3rem;
font-weight: 600;
}
.setting-title {
  flex: 0 0 25rem;
  max-width: 25rem;
  font-size: 1.8rem;
  font-weight: 600;
}
.setting-body {
  color: #686869;
  font-weight: 400;
  font-size: 1.4rem;
}
.settings-section .setting-body {
    max-width: 49rem;
}
.setting-block {
  margin-bottom: 2rem;
}
.account-input div {
  min-height: auto !important;
  height: 3rem !important;
}
.account-item {
font-size: 1.4rem;
font-weight: 500;
display: flex;
margin-bottom: 2rem;
}
.account-item_name {
  display: flex;
  flex: 0 0 14rem;
}
.account-input-comment {
  color: #686869;
  font-weight: 400;
  font-size: 1.2rem;
}
.setting-notifications-header {
  font-size: 1.5rem;
  font-weight: 600;
  max-width: 37rem;
}
.setting-notifications-radio label {
  font-size: 1.4rem !important;
  color: rgba(0, 0, 0, 1) !important;
  font-weight: 400 !important;
}
</style>