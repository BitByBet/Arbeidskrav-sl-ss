// Her kan du skrive testene dine
require("@testing-library/jest-dom");

const { screen } = require("@testing-library/dom");
const { Character, Enemy } = require("../app");

describe("Save character local storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should save character to local storage", () => {
    const hero = new Character("MyHEro", 69, 69, "hero.png");
    hero.saveToLocalStorage();

    const savedHero = localStorage.getItem("character");
    const parsedData = JSON.parse(savedHero);
    expect(parsedData).toEqual({
      name: "MyHEro",
      hp: 69,
      attack: 69,
      image: "hero.png",
    });
  });
});

describe("Enemy class", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should create an enemy with random stats", () => {
    const enemy = new Enemy();
    expect(enemy).toHaveProperty("name");
    expect(enemy).toHaveProperty("hp");
    expect(enemy).toHaveProperty("attack");
    expect(enemy).toHaveProperty("image");
    expect(enemy.hp).toBeGreaterThanOrEqual(50);
    expect(enemy.hp).toBeLessThanOrEqual(150);
    expect(enemy.attack).toBeGreaterThanOrEqual(10);
    expect(enemy.attack).toBeLessThanOrEqual(40);
  });

  test("should save enemy to local storage", () => {
    const enemy = new Enemy();
    enemy.saveToLocalStorage();

    const savedEnemy = localStorage.getItem("enemy");
    const parsedData = JSON.parse(savedEnemy);
    expect(parsedData).toHaveProperty("name");
    expect(parsedData).toHaveProperty("hp");
    expect(parsedData).toHaveProperty("attack");
    expect(parsedData).toHaveProperty("image");
  });
});




