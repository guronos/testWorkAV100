<template>
  <v-app>
    <main>
      <div class="settings-header px-4"><p>Настройки</p></div>
      <div class="result-change-email" v-if="resultChangeEmail">
        <v-alert dismissible width="32rem" type="success">{{
          resultChangeEmail
        }}</v-alert>
      </div>
      <div class="px-4 pt-5 d-flex flex-column settings-section">
        <div class="d-flex setting-block">
          <div class="setting-title">
            Звонок через SIP
            <v-switch
              @change="saveData($event, 'switchSIP')"
              v-model="switchSIP"
              color="success"
              :value="!switchSIP"
              hide-details
              class="d-inline-block"
            ></v-switch>
          </div>
          <div class="setting-body">
            Включите эту функцию чтобы Авито и другие площадки не блокировали
            ваш аккаунт. Будет выглядеть так, будто звонки совершаются с разных
            номеров.
          </div>
        </div>
        <div class="d-flex setting-block">
          <div class="setting-title">Учётная запись</div>
          <div class="">
            <div class="account-item">
              <div class="account-item_name">Компания</div>
              <v-text-field
                @change="saveData($event, 'companyName')"
                class="account-input"
                color="#66BB6A"
                v-model="companyName"
                :value="companyName"
                outlined
              ></v-text-field>
            </div>
            <div class="account-item">
              <div class="account-item_name">Логин</div>
              <v-text-field
                @change="saveData($event, 'loginUser')"
                class="account-input"
                color="#66BB6A"
                v-model="loginUser"
                :value="loginUser"
                outlined
              ></v-text-field>
            </div>
            <div class="account-item">
              <div class="account-item_name">Номер телефона</div>
              <v-text-field
                @change="saveData($event, 'phoneNumber')"
                class="account-input"
                color="#66BB6A"
                v-model="phoneNumber"
                :value="phoneNumber"
                outlined
              ></v-text-field>
            </div>
            <div class="account-item">
              <div class="account-item_name">Имя</div>
              <v-text-field
                @change="saveData($event, 'userName')"
                class="account-input"
                color="#66BB6A"
                v-model="userName"
                :value="userName"
                outlined
              ></v-text-field>
            </div>
            <div class="account-item">
              <div class="account-item_name">Фамилия</div>
              <div>
                <v-text-field
                  @change="saveData($event, 'userLastName')"
                  class="account-input"
                  color="#66BB6A"
                  v-model="userLastName"
                  :value="userLastName"
                  outlined
                ></v-text-field>
                <div class="account-input-comment">* Не обязательно</div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex setting-block">
          <div class="setting-title">Оповещения о новых подборках</div>
          <div class="d-flex flex-column">
            <div class="setting-body">
              Выберите, куда будут приходить уведомления при появлении
              автомобилей, которые подходят под критерии вашей подборки.
            </div>
            <div class="setting-notifications-header mt-5">
              Уведомления
              <v-radio-group
                @change="saveData($event, 'selectNotification')"
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
                <v-divider class="mb-2 pb-4" />
                <div class="d-flex justify-space-between">
                  <v-radio
                    label="Push"
                    color="primary"
                    value="push"
                    readonly
                  ></v-radio
                  ><v-tooltip bottom color="#26a763">
                    <template v-slot:activator="{ on, attrs }"
                      ><div
                        class="notification-tooltip"
                        v-bind="attrs"
                        v-on="on"
                      >
                        i
                      </div>
                    </template>
                    <span>Можно установить только в приложении</span>
                  </v-tooltip>
                </div>
                <v-divider class="mb-2 pb-4" />
                <div class="d-flex justify-space-between">
                  <v-radio
                    label="Email"
                    color="primary"
                    value="email"
                  ></v-radio>
                  <div
                    v-if="!editEmail"
                    @click="editEmail = true"
                    class="notification-path"
                  >
                    {{ handleInputEmail
                    }}<span
                      class="iconify"
                      data-icon="system-uicons:pen"
                      style="color: #6b6"
                      data-width="22"
                      data-height="22"
                    ></span>
                  </div>
                  <div v-else>
                    <v-text-field
                      class="account-input"
                      color="#66BB6A"
                      @change="saveData($event, 'handleInputEmail')"
                      v-model="handleInputEmail"
                      :value="handleInputEmail"
                      outlined
                    ></v-text-field>
                  </div>
                </div>
                <v-divider class="mb-2 pb-4" />
                <div class="d-flex justify-space-between">
                  <v-radio color="primary" value="telegram"
                    ><template v-slot:label>
                      <a href="https://avclick.me/v/AVinfoBot" @click="getLink"
                        >Telegram ID</a
                      >
                    </template></v-radio
                  >

                  <div
                    v-if="!editTelegram"
                    @click="editTelegram = true"
                    class="notification-path"
                  >
                    {{ handleInputTelegram
                    }}<span
                      class="iconify"
                      data-icon="system-uicons:pen"
                      style="color: #6b6"
                      data-width="22"
                      data-height="22"
                    ></span>
                  </div>
                  <div v-else>
                    <v-text-field
                      class="account-input"
                      color="#66BB6A"
                      @change="saveData($event, 'handleInputTelegram')"
                      v-model="handleInputTelegram"
                      :value="handleInputTelegram"
                      outlined
                    ></v-text-field>
                  </div>
                </div>
              </v-radio-group>
            </div>
          </div>
        </div>
        <div class="d-flex setting-block">
          <div class="setting-title">
            Переход в карточку
            <i class="fa-light fa-pencil" style="color: #2d8643"></i>
          </div>
          <div class="d-flex flex-column">
            <div class="setting-body">
              Выберите, каким образом будет открываться детальное представление
              выбранного вами транспорта.
            </div>
            <v-radio-group
              v-model="targetLink"
              column
              @change="saveData($event, 'targetLink')"
              class="setting-notifications-radio"
            >
              <v-radio
                label="В карточку в текущем окне"
                color="primary"
                value="self"
                class="black--text"
              ></v-radio>
              <v-divider class="mb-2 pb-4" />
              <div class="d-flex justify-space-between">
                <v-radio
                  label="В карточку в отдельном окне"
                  color="primary"
                  value="blank"
                ></v-radio>
              </div>
              <v-divider class="mb-2 pb-4" />
              <div class="d-flex justify-space-between">
                <v-radio
                  label="На источник"
                  color="primary"
                  value="source"
                ></v-radio>
                <v-tooltip bottom color="#26a763">
                  <template v-slot:activator="{ on, attrs }"
                    ><div class="notification-tooltip" v-bind="attrs" v-on="on">
                      i
                    </div>
                  </template>
                  <span>Прямой переход в объявление на источнике</span>
                </v-tooltip>
              </div>
            </v-radio-group>
          </div>
        </div>
        <div class="d-flex setting-block">
          <div class="setting-title">Прочие настройки</div>
          <div class="setting-notifications-radio">
            <div
              class="setting-time setting-notifications-radio d-flex align-baseline"
            >
              <div class="setting-header-time mr-6">Часовой пояс</div>
              <div>
                <v-select
                  @change="saveDataTime($event)"
                  :items="Object.values(items)"
                  :value="items[timeZone]"
                  solo
                ></v-select>
              </div>
            </div>
            <div class="d-flex align-end justify-sm-space-between">
              <v-checkbox
                @change="saveData($event, 'autoSkip')"
                v-model="autoSkip"
                label="Автоматически переходить к новым объявлениям"
                color="success"
                :value="autoSkip"
                hide-details
                class="other-setting"
              ></v-checkbox>
              <div>
                <v-tooltip bottom color="#26a763">
                  <template v-slot:activator="{ on, attrs }"
                    ><div class="notification-tooltip" v-bind="attrs" v-on="on">
                      i
                    </div>
                  </template>
                  <span
                    >Лента будет автоматически обновлятся 1 раз в 3
                    секунды</span
                  >
                </v-tooltip>
              </div>
            </div>
            <div class="d-flex align-end justify-sm-space-between">
              <v-checkbox
                @change="saveData($event, 'colorInLents')"
                v-model="colorInLents"
                label="Включить цвета в ленте"
                color="success"
                :value="colorInLents"
                hide-details
                class="other-setting"
              ></v-checkbox>
              <div>
                <v-tooltip bottom color="#26a763">
                  <template v-slot:activator="{ on, attrs }"
                    ><div class="notification-tooltip" v-bind="attrs" v-on="on">
                      i
                    </div>
                  </template>
                  <span>Включение зеленого/желтого цвета</span>
                </v-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex setting-block">
          <div class="setting-title"></div>
          <div class="save-setting">
            <div class="setting-notifications-radio d-flex flex-column">
              <v-divider class="pb-4" />
              <v-btn
                color="#26a763"
                class="white--text"
                @click="validateNotification"
                >Сохранить</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "IndexPage",
  head: {
    title: "TestWork",
    script: [
      {
        src: "https://code.iconify.design/3/3.1.0/iconify.min.js",
      },
    ],
  },
  data() {
    return {
      switchSIP: false,
      companyName: "",
      loginUser: "",
      phoneNumber: "",
      userName: "",
      userLastName: "",
      handleInputEmail: "",
      handleInputTelegram: "",
      selectNotification: "off",
      editEmail: false,
      editTelegram: false,
      targetLink: "",
      timeZone: "pass",
      autoSkip: null,
      colorInLents: null,
      resultChangeEmail: "",
      items: {
        Kaliningrad: "Калининград",
        Moscow: "Москва",
        Samara: "Самара",
        Ekaterinburg: "Екатиринбург",
        Omsk: "Омск",
        Krasnoyarsk: "Красноярск",
        Magadan: "Магадан",
        Vladivostok: "Владивосток",
        Yakutsk: "Якутск",
        Irkutsk: "Иркутск",
        pass: "",
      },
    };
  },
  /**
   * На хуке created проверяем в localStorage ключ userDataFromServer, если его нет, создаем и заполняем данными с сервера, которые получили в хуке 'nuxtServerInit'.
   * Вне зависимости от результатов проверки выполняем метод fillingFields.
   */
  created() {
    try {
      if (process.client) {
        if (!Object.keys(localStorage).includes("userDataFromServer")) {
          localStorage.setItem(
            "userDataFromServer",
            JSON.stringify(this.getUserData)
          );
        }
        this.fillingFields();
      }
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    ...mapGetters(["getUserData"]),
  },
  methods: {
    ...mapActions(["handlerChangeEmail"]),
    /**
     * Программный переход на другую страницу, декларативный переход не реализован, 
     * т.к. компонент vuetify v-select при указании тега <a> через v-slot прекращает всплытие,
     *  событие click не доходит до тега <a>.
     */
    getLink() {
      window.open("https://avclick.me/v/AVinfoBot", "_blank");
    },
    /**
     * Функция присваивающая полям значения из localStorage
     */
    fillingFields() {
      const data = JSON.parse(localStorage.getItem("userDataFromServer"));
      this.switchSIP = Boolean(Number(data.switchSIP)); // *
      /*
      * С сервера приходит '0' - строка, при преобразовании в Boolean дающая true, а не false, 
      * предварительное преобразование в число избавляет от указания дополнительных условий
      */
      this.companyName = data.companyName;
      this.userName = data.userName;
      this.loginUser = data.loginUser;
      this.phoneNumber = data.phoneNumber;
      this.selectNotification = data.selectNotification.toLowerCase();
      this.timeZone = data.timeZone;
      this.colorInLents = data.colorInLents;
      this.autoSkip = data.autoSkip;
      this.userLastName = data.userLastName;
      this.handleInputEmail = data.handleInputEmail;
      this.handleInputTelegram = data.handleInputTelegram;
      this.targetLink = data.targetLink;
    },
    /**
     * Функция вызывается при изменении значений в полях, для внесения изменений в localStorage.
     * @{event} - string, содержащая актуальное значение измененного input/checkbox
     * @{key} - string, содержащая наименование переменной привязанного к значению input/checkbox
     */
    saveData(event, key) {
      const rawData = JSON.parse(localStorage.getItem("userDataFromServer"));
      rawData[key] = event;
      localStorage.setItem("userDataFromServer", JSON.stringify(rawData));
    },
    /**
     * Функция вызывается при изменении значении часового пояса, для внесения изменений в localStorage.
     * @{event} - string, содержащая наименование города на кириллице, т.е. значение объекта
     */
    saveDataTime(event) {
      const valueTimeZone = Object.entries(this.items).filter(
        // Выбираем объект, фильтруя по значению
        (i) => i[1] === event
      );
      const rawData = JSON.parse(localStorage.getItem("userDataFromServer"));
      rawData.timeZone = valueTimeZone[0][0]; // Сохраняем только ключ объекта
      localStorage.setItem("userDataFromServer", JSON.stringify(rawData));
    },
    /**
     * Небольшая валидация, изменения в email возможна только если стоит отметка об уведомлениях по email и
     * заполнено поле редактирующее новый email. Далее вызываем action из store, при успешном ответе в
     * качестве результата получаем текст всплывающего уведомления. Чарез 3 секунды стираем текст уведомления
     * для автоматического сокрытия уведомления.
     *
     */
    async validateNotification() {
      if (this.selectNotification === "email" && this.handleInputEmail) {
        this.resultChangeEmail = await this.handlerChangeEmail(
          this.handleInputEmail
        );
        setTimeout(() => (this.resultChangeEmail = ""), 3000);
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600&family=Montserrat:wght@400;500;600&family=Open+Sans:wght@400;500;600&display=swap");
* {
  font-family: "Montserrat", "Dosis", "Open Sans", sans-serif;
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
.setting-notifications-radio {
  max-width: 37rem;
}
.setting-notifications-radio label {
  font-size: 1.4rem !important;
  color: rgba(0, 0, 0, 1) !important;
  font-weight: 400 !important;
}
.notification-tooltip {
  border: 1px solid #00000070;
  border-radius: 20px;
  width: 2.2rem;
  height: 2.2rem;
  text-align: center;
  color: #00000070;
  font-size: 1.5rem;
}
.notification-path:hover {
  cursor: pointer;
}
.setting-header-time {
  font-size: 1.4rem;
  font-weight: 500;
}
.save-setting {
  width: 100%;
}
.other-setting label {
  font-size: 1.2rem !important;
  font-weight: 500;
  color: #000 !important;
}
#list-55 {
  background-color: #2dc574;
  color: #fff;
}
.v-list-item__title {
  color: #fff;
}
.setting-time * {
  font-size: 1.2rem !important;
  max-height: 2.8rem;
  min-height: auto;
  max-width: 18.2rem;
}
.result-change-email {
  position: fixed;
  top: 1rem;
  left: 45%;
}
</style>
