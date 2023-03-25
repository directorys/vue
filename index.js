Vue.createApp({
  data() {
    return {
      cards: [],
    }
  },
  methods: {
    addCard() {
      // Добавление карточки:
      this.cards.push({
        _id: Date.now(),
        isActive: false,
        time: {
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        interval: ''
      });
    },

    launchTime(index) {
      // Меняем активность карточки:
      this.cards[index].isActive = !this.cards[index].isActive;

      // Переключение таймера:
      this._hasTimer(
        this.cards[index], 
        this.$refs.targetCard[index]
      );
    },

    stopTime(index) {
      // [!] В условиях ТЗ не было сказано
      // об обнулении и приостановки счетчика
      // только в состоянии включенного счетчика
      // поэтому счетчик можно обнулить и приостановить
      // как включенным, так и выключенным

      // Отключение активности карточки:
      this.cards[index].isActive = false;

      // Переключение таймера:
      this._hasTimer(
        this.cards[index],
        this.$refs.targetCard[index]
      );

      // Обнуление таймера:
      const {time} = this.cards[index];
      time.hours = time.minutes = time.seconds = 0;
    },

    // Приватные функции:

    _hasTimer(cards, targetCard) {
      // Проверка цвета карточки:
      this._hasColor(cards, targetCard);

      // Проверка запуска и приостановки таймера:
      this._hasInterval(cards);
    },

    // Переключение кнопки и цвета:
    _hasColor(cards, targetCard) {
      const parentElement = targetCard.closest('.vue__card');

      if (cards.isActive) {
        targetCard.classList.add('vue__start_type_stop');

        parentElement.style.setProperty(
          '--background-line-color',
          'var(--background-hover-color)'
        );
      } else {
        targetCard.classList.remove('vue__start_type_stop');

        parentElement.style.setProperty(
          '--background-line-color',
          'var(--background-added-color)'
        );
      }
    },

    // Переключения состояния таймера:
    _hasInterval(cards) {
      cards.isActive
       ? cards.interval = setInterval(() => {
          this._startTime(cards.time)
        }, 1000)
       : clearInterval(cards.interval)
    },

    // Действие таймера:
    _startTime(time) {
      const timeDate = new Date(0, 0, 0,
        time.hours,
        time.minutes,
        time.seconds + 1
      );

      time.hours = timeDate.getHours();
      time.minutes = timeDate.getMinutes();
      time.seconds = timeDate.getSeconds();
    }
  }
}).mount('#vue');