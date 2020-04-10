let calendar = document.getElementById('tistory-calendar');

let gridList = [];

for(let i = 0; i<25; i++){
  var div = document.createElement('div');
  var tooltip = document.createElement('h2');

  
  tooltip.style.visibility = 'hidden';
  tooltip.style.backgroundColor = '#555';
  tooltip.style.textAlign = 'center';
  tooltip.style.borderRadius = '6px';
  tooltip.style.padding = '5px 0';
  tooltip.style.color = '#fff';
  tooltip.style.width = '120px';
  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '1';
  tooltip.style.opacity = '0';
  tooltip.style.transition = 'opacity 0.3s';
  tooltip.style.marginLeft = '-60px';

  div.style.border = '1px solid #dedede';

  div.appendChild(tooltip);
  calendar.appendChild(div);
  gridList.push(div);
  
}

for(let i = 0 ; i<25;i++){
  
  gridList[i].onmouseover = () => {
    console.log(tooltip);
    gridList[i].firstElementChild.style.visibility = 'visible';
  };
  gridList[i].onmouseleave = () => {
    gridList[i].firstElementChild.style.visibility = 'hidden';
  };

}

calendar.style.display = 'grid';
calendar.style.gridTemplateRows = '20px 20px 20px 20px 20px';
calendar.style.gridTemplateColumns = '20px 20px 20px 20px 20px';
calendar.style.gridGap = '5px';
calendar.style.margin = '10px';

var xhttp = new XMLHttpRequest();
var res = '';
var temp = document.createElement('div');
var dayList = [];
var now = new Date();
now.setHours(0);
now.setMinutes(0);
now.setSeconds(0);
now.setMilliseconds(0);
xhttp.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200)
  {
      temp.innerHTML = this.responseText;
      var post = [];
      post = temp.querySelectorAll('.post-item');

      for(let item of post){
        let dayString = item.querySelector('.meta').firstElementChild.innerText;
        let title = item.querySelector('.title').innerText;
        var postDate = new Date(dayString);
        let dateOffset = Math.round((now - postDate)/1000/60/60/24);
        let postLink = item.querySelector('a').href;

        if(dateOffset<25){
          var a = document.createElement('a');
          a.style.color = '#fff';
          let targetGrid = gridList[24-dateOffset];
          targetGrid.style.backgroundColor = '#42b983';
          targetGrid.firstElementChild.innerText = dayString + '\n' + title;
          targetGrid.firstElementChild.href = postLink;
          targetGrid.firstElementChild.style.opacity = '1';
        }
      }

  }
};

xhttp.open("GET", "https://dev-pengun.tistory.com/", true);
xhttp.send();
