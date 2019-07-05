export default class Dates {

  static today = () => {
    let today = new Date();
    today.setHours(0,0,0,0);
    return today;
  };

  static yesterday = () => {
    let yesterday = this.getDayBefore(this.today());
    return yesterday;
  };

  static tomorrow = () => {
    let tomorrow = this.getDayAfter(this.today());
    return tomorrow;
  };

  static getDayBefore = (date, days = 1) => {
    let dayBefore = new Date(date.getTime());
    dayBefore.setHours(-24 * days);
    return dayBefore;
  };

  static getDayAfter = (date, days = 1) => {
    let dayAfter = new Date(date.getTime());
    dayAfter.setHours(24 * days);
    return dayAfter;
  };

  static isToday = (date) => {
    let referenceDate = new Date(date.getTime());
    referenceDate.setHours(0,0,0,0);
    return this.today().getTime() === referenceDate.getTime();
  };

  static isTomorrow = (date) => {
    let referenceDate = new Date(date.getTime());
    referenceDate.setHours(0,0,0,0);
    return this.tomorrow().getTime() === referenceDate.getTime();
  };

  static isYesterday = (date) => {
    let referenceDate = new Date(date.getTime());
    referenceDate.setHours(0,0,0,0);
    return this.yesterday().getTime() === referenceDate.getTime();
  };

  static getDateString = (date) => {
    if(!date)
      return 'Sem data definida';

    let dateString;

    if(this.isToday(date))
      dateString = 'Hoje';
    else if(this.isTomorrow(date))
      dateString = 'Amanhã';
    else if(this.isYesterday(date))
      dateString = 'Ontem';
    else if(this.isBetweenPeriod(date, this.getDayBefore(this.today(), 7), this.today()))
      dateString = date.toLocaleString('pt-BR', { weekday: 'long' });
    else
      dateString = date.toLocaleString('pt-BR', { day: 'numeric', month: 'long' });

    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  };

  static getTimeString = (date) => {
    if(!date)
      return 'Sem horário definido';

    const timeString = date.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return timeString;
  };
};