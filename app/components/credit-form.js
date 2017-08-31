import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {

    let me = this;

    // Initialize semantic-ui components
    me.$('#termsCheckbox').checkbox();
    me.$('#cardType').dropdown();

    me.$('#credit')
    .form({
      fields: {
        usd: {
          identifier: 'usd',
          rules: [
            {
              type   : 'regExp',
              value  : /(^\d{1,7}$)|^(\d{1,7}\.\d{0,3})$/i, // 700.121 $
              prompt : 'Введите корректное количество покупаемой валюты'
            }
          ]
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type   : 'email',
              prompt : 'Введите корректный адрес Вашего почтового ящика'
            }
          ]
        },
        name: {
          identifier: 'name',
          rules: [
            {
              type   : 'empty',
              prompt : 'Введите Ваше ФИО'
            }
          ]
        },
        phone: {
          identifier: 'phone',
          rules: [
            {
              type   : 'regExp',
              value  : /^\+(?:[0-9] ?){6,14}[0-9]$/i, // International phone numbers
              prompt : 'Введите корректный номер Вашего телефона'
            }
          ]
        },
        birthday: {
          identifier: 'birthday',
          rules: [
            {
              type   : 'regExp',

              // 21.04.2001
              value  : /^(((0[1-9]|[12]\d|3[01])\.(0[13578]|1[02])\.((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\.(0[13456789]|1[012])\.((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\.02\.((19|[2-9]\d)\d{2}))|(29\.02\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/i,
              prompt : 'Введите дату Вашего рождения в формате дд.мм.гггг'
            }
          ]
        },
        wallet: {
          identifier: 'wallet',
          rules: [
            {
              type   : 'regExp',
              value  : /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/i, // 1GwV7fPX97hmavc6iNrUZUogmjpLPrPFoE
              prompt : 'Введите корректный адрес Вашего Bitcoin кошелька'
            }
          ]
        },
        terms: {
          identifier: 'terms',
          rules: [
            {
              type   : 'checked',
              prompt : 'Вы должны согласиться с указанной Вами ценой и правилами'
            }
          ]
        },
        card: {
          identifier: 'card',
          rules: [
            {
              type   : 'empty',
              prompt : 'Вы должны выбрать тип карты'
            }
          ]
        },
        number: {
          identifier: 'number',
          rules: [
            {
              type   : 'creditCard',
              prompt : 'Вы должны указать корректный номер карты'
            }
          ]
        },
        cv: {
          identifier: 'cv',
          rules: [
            {
              type   : 'regExp',
              value  : /^\d{3}$/i, // 000-999
              prompt : 'Вы должны указать корректный CV карты'
            }
          ]
        },
        month: {
          identifier: 'month',
          rules: [
            {
              type   : 'regExp',
              value  : /^(0[123456789])$|^(1[012])$/i, // 01-12
              prompt : 'Вы должны указать корректный месяц действия карты'
            }
          ]
        },
        year: {
          identifier: 'year',
          rules: [
            {
              type   : 'regExp',
              value  : /^(1[789])$|^(2[\d])$/i, // 17-29
              prompt : 'Вы должны указать корректный год действия карты'
            }
          ]
        }
      }
    });

    let usd = me.$('#usdConfirm');
    let btc = me.$('#btcConfirm');

    usd.on("blur", function() {
        verifyNumber(me.$(this), me.$(this).val());
    });
    
    usd.on("keypress", function() {
        verifyNumber(me.$(this), me.$(this).val());
    });
    
    usd.on("keyup", function() {
        verifyNumber(me.$(this), me.$(this).val());
        btc.val(
            (usd.val() / 3930.42)
            .toFixed(6)
        );
    });
    
    usd.on("change", function() {
        verifyNumber(me.$(this), me.$(this).val());
    });

    btc.on("blur", function() {
        verifyNumber(me.$(this), me.$(this).val());
    });
    
    btc.on("keypress", function() {
        verifyNumber(me.$(this), me.$(this).val());
    });
    
    btc.on("keyup", function() {
        verifyNumber(me.$(this), me.$(this).val());
        usd.val(
            (btc.val() * 3930.42)
            .toFixed(3)
        );
    });
    
    btc.on("change", function() {
        verifyNumber(me.$(this), me.$(this).val());
    });

    function verifyNumber(context, ch)
    {
        if (isNumber(ch)) {
            context.val(ch);
        }
        else {
            context.val(ch.slice(0, -1));
        }
    }
    
    function isNumber(param)
    {
        if (param == 0)
            return true;
        return (param / param) ? true : false;
    }

    usd.trigger("keyup");
  },
  
  actions: {
  
      submitForm() {

      }
  }

});