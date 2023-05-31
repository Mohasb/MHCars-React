import { useEffect } from "react";
import "./prueba.scss";
export default function Prueba() {
  useEffect(() => {
    (function () {
      "use strict";

      var BODY_BACKGROUNDS = ["#8850FF", "#FFBA00", "#4054FF"];

      function Slider() {
        this.cards = document.querySelectorAll(".card");
        this.currentIndex = 0;

        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;

        this.initEvents();
        this.setActivePlaceholder();
      }

      // initialize drag events
      Slider.prototype.initEvents = function () {
        document.addEventListener("touchstart", this.onStart.bind(this));
        document.addEventListener("touchmove", this.onMove.bind(this));
        document.addEventListener("touchend", this.onEnd.bind(this));

        document.addEventListener("mousedown", this.onStart.bind(this));
        document.addEventListener("mousemove", this.onMove.bind(this));
        document.addEventListener("mouseup", this.onEnd.bind(this));
      };

      // set active placeholder
      Slider.prototype.setActivePlaceholder = function () {
        var placeholders = document.querySelectorAll(
          ".cards-placeholder__item"
        );
        var activePlaceholder = document.querySelector(
          ".cards-placeholder__item--active"
        );

        if (activePlaceholder) {
          activePlaceholder.classList.remove("cards-placeholder__item--active");
        }

        placeholders[this.currentIndex].classList.add(
          "cards-placeholder__item--active"
        );

        var bodyEl = document.querySelector("body");
        bodyEl.style.backgroundColor = BODY_BACKGROUNDS[this.currentIndex];
      };

      // mousedown event
      Slider.prototype.onStart = function (evt) {
        this.isDragging = true;

        this.currentX = evt.pageX || evt.touches[0].pageX;
        this.startX = this.currentX;

        var card = this.cards[this.currentIndex];

        // calculate ration to use in parallax effect
        this.windowWidth = window.innerWidth;
        this.cardWidth = card.offsetWidth;
        this.ratio = this.windowWidth / (this.cardWidth / 4);
      };

      // mouseup event
      Slider.prototype.onEnd = function (evt) {
        this.isDragging = false;

        var diff = this.startX - this.currentX;
        var direction = diff > 0 ? "left" : "right";
        this.startX = 0;

        if (Math.abs(diff) > this.windowWidth / 4) {
          if (direction === "left") {
            this.slideLeft();
          } else if (direction === "right") {
            this.slideRight();
          } else {
            this.cancelMoveCard();
          }
        } else {
          this.cancelMoveCard();
        }
      };

      // mousemove event
      Slider.prototype.onMove = function (evt) {
        if (!this.isDragging) return;

        this.currentX = evt.pageX || evt.touches[0].pageX;
        var diff = this.startX - this.currentX;
        diff *= -1;

        // don't let drag way from the center more than quarter of window
        if (Math.abs(diff) > this.windowWidth / 4) {
          if (diff > 0) {
            diff = this.windowWidth / 4;
          } else {
            diff = -this.windowWidth / 4;
          }
        }

        this.moveCard(diff);
      };

      // slide to left direction
      Slider.prototype.slideLeft = function () {
        // if last don't do nothing
        if (this.currentIndex === this.cards.length - 1) {
          this.cancelMoveCard();
          return;
        }

        var self = this;
        var card = this.cards[this.currentIndex];
        var cardWidth = this.windowWidth / 2;

        card.style.left = "-50%";

        this.resetCardElsPosition();

        this.currentIndex += 1;
        this.setActivePlaceholder();
        card = this.cards[this.currentIndex];

        card.style.left = "50%";

        this.moveCardEls(cardWidth * 3);

        // add delay to resetting position
        setTimeout(function () {
          self.resetCardElsPosition();
        }, 50);
      };

      // slide to right direction
      Slider.prototype.slideRight = function () {
        // if last don't do nothing
        if (this.currentIndex === 0) {
          this.cancelMoveCard();
          return;
        }

        var self = this;
        var card = this.cards[this.currentIndex];
        var cardWidth = this.windowWidth / 2;

        card.style.left = "150%";

        this.resetCardElsPosition();

        this.currentIndex -= 1;
        this.setActivePlaceholder();
        card = this.cards[this.currentIndex];

        card.style.left = "50%";

        this.moveCardEls(-cardWidth * 3);

        // add delay to resetting position
        setTimeout(function () {
          self.resetCardElsPosition();
        }, 50);
      };

      // put active card in original position (center)
      Slider.prototype.cancelMoveCard = function () {
        var self = this;
        var card = this.cards[this.currentIndex];

        card.style.transition = "transform 0.5s ease-out";
        card.style.transform = "";

        this.resetCardElsPosition();
      };

      // reset to original position elements of card
      Slider.prototype.resetCardElsPosition = function () {
        var self = this;
        var card = this.cards[this.currentIndex];

        var cardLogo = card.querySelector(".card__logo");
        var cardPrice = card.querySelector(".card__price");
        var cardTitle = card.querySelector(".card__title");
        var cardSubtitle = card.querySelector(".card__subtitle");
        var cardImage = card.querySelector(".card__image");
        var cardWishList = card.querySelector(".card__wish-list");
        var cardCategory = card.querySelector(".card__category");
        var cardWillAnimate = card.querySelectorAll(".card__will-animate");

        // move card elements to original position
        cardWillAnimate.forEach(function (el) {
          el.style.transition = "transform 0.5s ease-out";
        });

        cardLogo.style.transform = "";
        cardPrice.style.transform = "";

        cardTitle.style.transform = "";
        cardSubtitle.style.transform = "";

        cardImage.style.transform = "";
        cardWishList.style.transform = "";
        cardCategory.style.transform = "";

        // clear transitions
        setTimeout(function () {
          card.style.transform = "";
          card.style.transition = "";

          cardWillAnimate.forEach(function (el) {
            el.style.transition = "";
          });
        }, 500);
      };

      // slide card while dragging
      Slider.prototype.moveCard = function (diff) {
        var card = this.cards[this.currentIndex];

        card.style.transform = "translateX(calc(" + diff + "px - 50%))";
        diff *= -1;

        this.moveCardEls(diff);
      };

      // create parallax effect on card elements sliding them
      Slider.prototype.moveCardEls = function (diff) {
        var card = this.cards[this.currentIndex];

        var cardLogo = card.querySelector(".card__logo");
        var cardPrice = card.querySelector(".card__price");
        var cardTitle = card.querySelector(".card__title");
        var cardSubtitle = card.querySelector(".card__subtitle");
        var cardImage = card.querySelector(".card__image");
        var cardWishList = card.querySelector(".card__wish-list");
        var cardCategory = card.querySelector(".card__category");
        var cardWillAnimate = card.querySelectorAll(".card__will-animate");

        cardLogo.style.transform = "translateX(" + diff / this.ratio + "px)";
        cardPrice.style.transform = "translateX(" + diff / this.ratio + "px)";

        cardTitle.style.transform =
          "translateX(" + diff / (this.ratio * 0.9) + "px)";
        cardSubtitle.style.transform =
          "translateX(" + diff / (this.ratio * 0.85) + "px)";

        cardImage.style.transform =
          "translateX(" + diff / (this.ratio * 0.35) + "px)";

        cardWishList.style.transform =
          "translateX(" + diff / (this.ratio * 0.85) + "px)";
        cardCategory.style.transform =
          "translateX(" + diff / (this.ratio * 0.65) + "px)";
      };

      // create slider
      var slider = new Slider();
    })();
  });

  return (
    <>
      <div className="wrapper">
        <div className="card card--19">
          <div className="card__header card__header--19">
            <div className="card__watermark" data-watermark="Air"></div>

            <img
              src="https://i.ibb.co/q7RKcZk/nike.png"
              alt="Nike"
              className="card__logo card__will-animate"
            />

            <span className="card__price card__will-animate">$120</span>

            <h1 className="card__title card__will-animate">Air Structure 1</h1>
            <span className="card__subtitle card__will-animate">
              From the Flymesh upper to the triple-density foam midsole, the
              Nike Air Zoom Structure 19 Men's Running Shoe offers plenty of
              support and the response you need for a smooth, stable ride that
              feels ultra fast.
            </span>
          </div>

          <div className="card__body">
            <img
              src="https://i.ibb.co/R0Y8T8r/nike19.png"
              alt="Nike 19"
              className="card__image card__will-animate"
            />
            <div className="card__wish-list card__wish-list--19 card__will-animate">
              Wish List
            </div>

            <span className="card__category card__will-animate">
              Men's running shoe
            </span>
          </div>
        </div>

        <div className="card card--solstice">
          <div className="card__header card__header--solstice">
            <div className="card__watermark" data-watermark="Classic"></div>

            <img
              src="https://i.ibb.co/q7RKcZk/nike.png"
              alt="Nike"
              className="card__logo card__will-animate"
            />

            <span className="card__price card__will-animate">$129</span>

            <h1 className="card__title card__will-animate">Air Solstice QS</h1>
            <span className="card__subtitle card__will-animate">
              The Nike Air Solstice draws inspiration from the swoosh's classic
              running shoes of the 1980's updating the style with premium
              materials and impressive production quality.
            </span>
          </div>

          <div className="card__body">
            <img
              src="https://i.ibb.co/ZMVHp6x/nike-air-solstice.png"
              alt="Nike Solstice"
              className="card__image card__will-animate"
            />
            <div className="card__wish-list card__wish-list--solstice card__will-animate">
              Wish List
            </div>

            <span className="card__category card__will-animate">
              Men's shoe
            </span>
          </div>
        </div>

        <div className="card card--huarache">
          <div className="card__header card__header--huarache">
            <div className="card__watermark" data-watermark="Safari"></div>

            <img
              src="https://i.ibb.co/q7RKcZk/nike.png"
              alt="Nike"
              className="card__logo card__will-animate"
            />

            <span className="card__price card__will-animate">$140</span>

            <h1 className="card__title card__will-animate">
              Air Huarache Utility
            </h1>
            <span className="card__subtitle card__will-animate">
              The Nike Air Huarache Utility Men's Shoe toughens up a famous
              running shoe with a nylon upper, fused mudguard and vibrant
              detail.
            </span>
          </div>

          <div className="card__body">
            <img
              src="https://i.ibb.co/9bc3SYK/nike-safari.png"
              alt="Nike Huarache"
              className="card__image card__will-animate"
            />
            <div className="card__wish-list card__wish-list--solstice card__will-animate">
              Wish List
            </div>

            <span className="card__category card__will-animate">
              Men's shoe
            </span>
          </div>
        </div>
      </div>

      <div className="cards-placeholder">
        <div className="cards-placeholder__item"></div>
        <div className="cards-placeholder__item"></div>
        <div className="cards-placeholder__item"></div>
      </div>

      <span className="inspired-by">
        Inspired by{" "}
        <a
          href="https://dribbble.com/shots/2518516-Nike-Promotion-Ads-Parallax-Effect"
          target="_blank"
        >
          Jardson Almeida
        </a>
      </span>
    </>
  );
}
