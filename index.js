function playSound(drumButton) {
  var drumImageURL = getComputedStyle(drumButton).getPropertyValue("background-image")
  // Strip folderpath from URL
  drumImageURL = drumImageURL.substring(drumImageURL.lastIndexOf("/")+1,drumImageURL.lastIndexOf("\""))
  var drumName = drumImageURL.substring(0,drumImageURL.lastIndexOf(".png"))
  switch (drumName) {
    case "tom1":
    case "tom2":
    case "tom3":
    case "tom4":
      drumName=drumName.substring(0,drumName.length-1)+"-"+drumName.substring(drumName.length-1);
      break;
    case "kick":
      drumName=drumName+"-bass"
      break;
    default:
      drumName=drumName;
  }
  var drumSoundURL = "sounds/"+drumName+".mp3"
  var drumSound = new Audio(drumSoundURL);
  drumSound.play();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function buttonAnimation (drumButton) {
  drumButton.classList.add("pressed");
  setTimeout(function(){ drumButton.classList.remove("pressed");; }, 50);
  // drumButton.classList.remove("pressed");
}

var drumButtons = document.querySelectorAll(".drum")
var drumButtonLetters=[];

for (var drumOrd=0;drumOrd<drumButtons.length;drumOrd++) {
  drumButtonLetters.push(drumButtons[drumOrd].innerHTML);
}
for (var drumOrd=0;drumOrd<drumButtons.length;drumOrd++) {
    drumButtons[drumOrd].addEventListener("click",function (event) {
      var drumButton=event.target;
      playSound(drumButton);
      buttonAnimation(drumButton);
    });
}

window.addEventListener("keydown",function (event) {
  if (drumButtonLetters.includes(event.key)) {
    var drumButton=document.querySelector("."+event.key+".drum")
    playSound(drumButton);
    buttonAnimation(drumButton);
  }
});
