/*This script parses emoji elements to turn them into their corresponding emoji positions! Credits to Lilithdev*/

const emojiList = {
    "🎀🟦": { x: 0, y: 0 },
    "💙": { x: 20, y: 0 },
    "♪": { x: 40, y: 0 },
    "💢": { x: 60, y: 0 },
    "💥": { x: 80, y: 0 },
    "💦": { x: 100, y: 0 },
    "💩": { x: 120, y: 0 },
    "💪": { x: 140, y: 0 },
    "???": { x: 160, y: 0 },
    "🎊": { x: 180, y: 0 },
    "👊": { x: 200, y: 0 },
    "👍": { x: 220, y: 0 },
    "💞": { x: 0, y: 20 },
    "🔋": { x: 20, y: 20 },
    "😊": { x: 40, y: 20 },
    "😍": { x: 60, y: 20 },
    "😭": { x: 80, y: 20 },
    "🙋": { x: 100, y: 20 },
    "🙏": { x: 120, y: 20 },
    "🤫": { x: 140, y: 20 },
    "🤮": { x: 160, y: 20 },
    "🥺": { x: 180, y: 20 },
    "🍖": { x: 200, y: 20 },
    "🍰": { x: 220, y: 20 },
    "🎀": { x: 0, y: 40 },
    "🎉": { x: 20, y: 40 },
    "🐈": { x: 40, y: 40 },
    "🐕": { x: 60, y: 40 },
    "🐘": { x: 80, y: 40 },
    "🐧": { x: 100, y: 40 },
    "🐱": { x: 120, y: 40 },
    "🐶": { x: 140, y: 40 },
    "👀": { x: 160, y: 40 },
    "👒": { x: 180, y: 40 },
    "👗": { x: 200, y: 40 },
    "💓": { x: 220, y: 40 },
    "💕": { x: 0, y: 60 },
    "💖": { x: 20, y: 60 },
    "💗": { x: 40, y: 60 },
    "😂": { x: 60, y: 60 },
    "😅": { x: 80, y: 60 },
    "😆": { x: 100, y: 60 },
    "😇": { x: 120, y: 60 },
    "😘": { x: 140, y: 60 },
    "😢": { x: 160, y: 60 },
    "😥": { x: 180, y: 60 },
    "😨": { x: 200, y: 60 },
    "😱": { x: 220, y: 60 },
    "🙅": { x: 0, y: 80 },
    "🙆": { x: 20, y: 80 },
    "🤔": { x: 40, y: 80 },
    "🤦": { x: 60, y: 80 },
    "🤩": { x: 80, y: 80 },
    "🤷": { x: 100, y: 80 },
    "🦈": { x: 120, y: 80 },
    "☝️": { x: 140, y: 80 },
    "✌️": { x: 160, y: 80 },
    "✨": { x: 180, y: 80 },
    "🔒": { x: 200, y: 80 },
    "☮️": { x: 220, y: 80 },
    "💃": { x: 0, y: 100 },
    "🥰": { x: 20, y: 100 },
    "👇": { x: 40, y: 100 },
    "😳": { x: 60, y: 100 },
    "🤣": { x: 80, y: 100 },
    "😒": { x: 100, y: 100 },
    "😶": { x: 120, y: 100 },
    "😮‍💨": { x: 140, y: 100 },
    "😌": { x: 160, y: 100 },
    "🤪": { x: 180, y: 100 },
    "😊": { x: 200, y: 100 },
    "👏": { x: 220, y: 100 },
    "😏": { x: 0, y: 120 },
    "😩": { x: 20, y: 120 },
    "👅": { x: 40, y: 120 },
    "😬": { x: 60, y: 120 },
    "📈": { x: 80, y: 120 },
    "🔥": { x: 100, y: 120 },
    "😈": { x: 120, y: 120 },
    "❤️": { x: 140, y: 120 }
  };
  
  function adaptEmojis() {
    document.querySelectorAll("emj").forEach(function (emjTag) {
      if(emojiList.hasOwnProperty(emjTag.innerHTML)) {
        const img = document.createElement("img");
        img.setAttribute("style", `
          width: 20px;
          height: 20px;
          background-image: url(assets/icon_emoji.png);
          vertical-align: text-bottom;
          background-position: -${emojiList[emjTag.innerHTML].x}px -${emojiList[emjTag.innerHTML].y}px;
        `);
        img.setAttribute("src", "assets/blah.gif");
        img.setAttribute("alt", emjTag.innerHTML);
        img.setAttribute("class", "emoji");
        
        emjTag.replaceWith(img);
      }
    });
  }
  
  adaptEmojis();
  