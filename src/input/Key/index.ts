/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

export default class Key {
  code: number;
  duration = 0;
  isDown = false;
  repetitions = 0;
  repetitionTimer = 0;
  repetitionSpeed = 0;

  constructor(code: number) {
    this.code = code;
  }

  static get ARROW_LEFT(): number {
    return 37;
  }

  static get ARROW_UP(): number {
    return 38;
  }

  static get ARROW_RIGHT(): number {
    return 39;
  }

  static get ARROW_DOWN(): number {
    return 40;
  }

  static get SHIFT(): number {
    return 16;
  }

  static get SPACEBAR(): number {
    return 32;
  }

  static get BACKSPACE(): number {
    return 8;
  }

  static get ESCAPE(): number {
    return 27;
  }

  static get ENTER(): number {
    return 13;
  }

  static get TAB(): number {
    return 9;
  }

  static get ALT(): number {
    return 18;
  }

  static get CONTROL(): number {
    return 17;
  }

  static get FUNCTION1(): number {
    return 112;
  }

  static get FUNCTION2(): number {
    return 113;
  }

  static get FUNCTION3(): number {
    return 114;
  }

  static get FUNCTION4(): number {
    return 115;
  }

  static get FUNCTION5(): number {
    return 116;
  }

  static get FUNCTION6(): number {
    return 117;
  }

  static get FUNCTION7(): number {
    return 118;
  }

  static get FUNCTION8(): number {
    return 119;
  }

  static get FUNCTION9(): number {
    return 120;
  }

  static get FUNCTION10(): number {
    return 121;
  }

  static get FUNCTION11(): number {
    return 122;
  }

  static get FUNCTION12(): number {
    return 123;
  }

  static get A(): number {
    return 65;
  }

  static get B(): number {
    return 66;
  }

  static get C(): number {
    return 67;
  }

  static get D(): number {
    return 68;
  }

  static get E(): number {
    return 69;
  }

  static get F(): number {
    return 70;
  }

  static get G(): number {
    return 71;
  }

  static get H(): number {
    return 72;
  }

  static get I(): number {
    return 73;
  }

  static get J(): number {
    return 74;
  }

  static get K(): number {
    return 75;
  }

  static get L(): number {
    return 76;
  }

  static get M(): number {
    return 77;
  }

  static get N(): number {
    return 78;
  }

  static get O(): number {
    return 79;
  }

  static get P(): number {
    return 80;
  }

  static get Q(): number {
    return 81;
  }

  static get R(): number {
    return 82;
  }

  static get S(): number {
    return 83;
  }

  static get T(): number {
    return 84;
  }

  static get U(): number {
    return 85;
  }

  static get V(): number {
    return 86;
  }

  static get W(): number {
    return 87;
  }

  static get X(): number {
    return 88;
  }

  static get Y(): number {
    return 89;
  }

  static get Z(): number {
    return 90;
  }

  static get NUM0(): number {
    return 48;
  }

  static get NUM1(): number {
    return 49;
  }

  static get NUM2(): number {
    return 50;
  }

  static get NUM3(): number {
    return 51;
  }

  static get NUM4(): number {
    return 52;
  }

  static get NUM5(): number {
    return 53;
  }

  static get NUM6(): number {
    return 54;
  }

  static get NUM7(): number {
    return 55;
  }

  static get NUM8(): number {
    return 56;
  }

  static get NUM9(): number {
    return 57;
  }

  Process(): void {
    this.isDown === true && this.duration++;

    if (++this.repetitionTimer >= this.repetitionSpeed) {
      this.repetitions = 0;
      this.repetitionTimer = 0;
    }
  }

  Reset(): void {
    this.duration = 0;
    this.repetitions = 0;
    this.repetitionTimer = 0;
  }

  PushDown(): void {
    this.isDown = true;
    this.duration = 0;
    this.repetitions++;
    this.repetitionTimer = 0;
  }

  Release(): void {
    this.isDown = false;
  }
}
