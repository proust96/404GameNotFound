$(document).ready(function() {

var snd = new Audio("img/sound_vent.wav"); // buffers automatically when created
snd.loop = true;
snd.volume = 0.25;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var hauteurInitialeBateau = 84;
var tailleBateau = 65;
var bateau_coord = [20,hauteurInitialeBateau,tailleBateau];
var taille=10;
var tailleBox=10;
var vitesseBateau = [0,0];
var obstacles = [];
var vitesseObstacle = 0.35;
var distanceObstacle = 170;
var tailleObstacle = 60;
var boxs = [];
var vitesseBox = 0.55;
var distanceBox = 350;
var tailleBox = 23;
var hauteurBox = 42;
var positionMer = 0;
var enSaut = 0;
var compteurVague = 0;
var positionSoleil = 240;
var vitesseSoleil = 0.137;
var vitesseFond = 0.10;
var positionFond = 0;
var doitParler = 0;
var migrant = [350, 100, getRandomInt(1,2)];
var compteurMigrants = 0;
var gamePaused = 1;
var gameStarted = 0;

$(document).click(function(e){

    	if (gamePaused == 1){
			snd.play();

			hauteurInitialeBateau = 84;
			tailleBateau = 65;
			bateau_coord = [20,hauteurInitialeBateau,tailleBateau];
			taille=10;
			tailleBox=10;
			vitesseBateau = [0,0];
			obstacles = [];
			vitesseObstacle = 0.35;
			distanceObstacle = 170;
			tailleObstacle = 60;
			boxs = [];
			vitesseBox = 0.55;
			distanceBox = 270;
			tailleBox = 23;
			hauteurBox = 42;
			positionMer = 0;
			enSaut = 0;
			compteurVague = 0;
			positionSoleil = 240;
			vitesseSoleil = 0.137;
			vitesseFond = 0.10;
			positionFond = 0;
			doitParler = 0;
			migrant = [350, 100, getRandomInt(1,2)];
			compteurMigrants = 0;

			for (var i = 1; i < taille; i++){ //genere les obstacles
				obstacles[i] = [i*distanceObstacle-40+Math.random()*80, 92 + 30 - tailleObstacle*0.88, getRandomInt(1,4)];
			}

			for (var i = 0; i < tailleBox; i++){  //genere les boxs
				boxs[i] = [(i+1)*distanceBox-40+Math.random()*80, 90 + 30 - tailleBox*0.88];
			}
			gameStarted = 1;
    		gamePaused = 0;
    	}
    	else{
    		sautBateau();
    	}

});

$(document).keydown(function(e){
	if(e.keyCode == 32){
    	if (gamePaused == 1){
			snd.play();

			hauteurInitialeBateau = 84;
			tailleBateau = 65;
			bateau_coord = [20,hauteurInitialeBateau,tailleBateau];
			taille=10;
			tailleBox=10;
			vitesseBateau = [0,0];
			obstacles = [];
			vitesseObstacle = 0.35;
			distanceObstacle = 170;
			tailleObstacle = 60;
			boxs = [];
			vitesseBox = 0.55;
			distanceBox = 270;
			tailleBox = 23;
			hauteurBox = 42;
			positionMer = 0;
			enSaut = 0;
			compteurVague = 0;
			positionSoleil = 240;
			vitesseSoleil = 0.137;
			vitesseFond = 0.10;
			positionFond = 0;
			doitParler = 0;
			migrant = [350, 100, getRandomInt(1,2)];
			compteurMigrants = 0;

			for (var i = 1; i < taille; i++){ //genere les obstacles
				obstacles[i] = [i*distanceObstacle-40+Math.random()*80, 92 + 30 - tailleObstacle*0.88, getRandomInt(1,4)];
			}

			for (var i = 0; i < tailleBox; i++){  //genere les boxs
				boxs[i] = [(i+1)*distanceBox-40+Math.random()*80, 90 + 30 - tailleBox*0.88];
			}
			gameStarted = 1;
    		gamePaused = 0;
    	}
    	else{
    		sautBateau();
    	}
   }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawMer(){
    var img = document.getElementById("mer");
    ctx.drawImage(img, positionMer, 58, 400, 100);
    ctx.drawImage(img, positionMer + 400, 58, 400, 100);
    if (positionSoleil < -550){
    	positionSoleil = 500;
    }
    if (positionSoleil < -50){
    	img = document.getElementById("lune");
    	ctx.drawImage(img, positionSoleil + 500, -20, 40, 40);
    }
    else{
    	img = document.getElementById("soleil");
    	ctx.drawImage(img, positionSoleil, -20, 40, 40);
    }

}

function drawObstacles() {
	for (var i = 1; i < taille ; i++){
    	var img = document.getElementById("recif" + obstacles[i][2]);
    	if (obstacles[i][2] == 1){
			ctx.drawImage(img, obstacles[i][0], obstacles[i][1], tailleObstacle, tailleObstacle);
    	}else if (obstacles[i][2] == 2){
    		ctx.drawImage(img, obstacles[i][0], obstacles[i][1], tailleObstacle, tailleObstacle);
    	}else if (obstacles[i][2] == 3){
    		ctx.drawImage(img, obstacles[i][0], obstacles[i][1]-13, tailleObstacle, tailleObstacle);
    	}else if (obstacles[i][2] == 4){
			ctx.drawImage(img, obstacles[i][0], obstacles[i][1]-16, tailleObstacle, tailleObstacle);
		}
	}
}

function drawBoxs() {
	for (var i = 0; i < tailleBox ; i++){
    	var img = document.getElementById("barril");
		ctx.drawImage(img, boxs[i][0], boxs[i][1], tailleBox, hauteurBox);
	}
}

function updatePosObstacles(){ //update toutes les positions
	for (var i = 1; i < taille; i++){
		obstacles[i][0] = obstacles[i][0] - vitesseObstacle;
		if (obstacles[i][0] < -50){
			obstacles[i][0] = -50 + 9 * distanceObstacle-40+Math.random()*80;
			obstacles[i][2] = getRandomInt(1,4);
		}
	}
	for (var i = 0; i < tailleBox; i++){
		boxs[i][0] = boxs[i][0] - vitesseBox;
		if (boxs[i][0] < -50){
			boxs[i][0] = 300+Math.random()*1700;
		}
	}
	positionMer = positionMer - vitesseBox;
	if (positionMer <= - 400){
		positionMer = 0;
	}
	positionSoleil = positionSoleil - vitesseSoleil;
	positionFond = positionFond - vitesseFond;
	if (positionFond <= - 400){
		positionFond = 400;
	}
	migrant[0] = migrant[0] - vitesseBox;
	if (migrant[0] < 160 && migrant[0] > 50){
		doitParler = 1;
	}
	else if (migrant[0] <= 50){
		doitParler = 0;
	}
	if (migrant[0] > 0 && migrant[0] < 45 && bateau_coord[1]==hauteurInitialeBateau){
		compteurMigrants = compteurMigrants + migrant[2];
		migrant[0] = 250 + Math.random()*750;
		migrant[2] = getRandomInt(1,2);
		
	}
	else if (migrant[0] < -100){
		migrant[0] = 250 + Math.random()*750;
		migrant[2] = getRandomInt(1,2);
	}
}

function drawMigrant(){
	var img = document.getElementById("human1");
    ctx.drawImage(img, migrant[0] + 5, migrant[1]-18, bateau_coord[2]/6, bateau_coord[2]/2);
    if (migrant[2] == 2){
   	 	img = document.getElementById("human2");
   		ctx.drawImage(img, migrant[0] + 15, migrant[1]-18, bateau_coord[2]/6, bateau_coord[2]/2);
	}
	var img = document.getElementById("bateau_img2");
    ctx.drawImage(img, migrant[0], migrant[1], bateau_coord[2]/2, bateau_coord[2]/2);
    img = document.getElementById("rame");
    ctx.drawImage(img, migrant[0], migrant[1], bateau_coord[2]/2, bateau_coord[2]/2);
}

function drawBateau() {
	drawVague2();
	var img = document.getElementById("sauv1");
    ctx.drawImage(img, bateau_coord[0] + 10, bateau_coord[1]-5, bateau_coord[2]/6, bateau_coord[2]/2);
    img = document.getElementById("sauv2");
    ctx.drawImage(img, bateau_coord[0] + 24, bateau_coord[1]-5, bateau_coord[2]/6, bateau_coord[2]/2);
    if (doitParler == 1){
    	img = document.getElementById("404tuyau1");
    	ctx.drawImage(img, bateau_coord[0] + 22, bateau_coord[1]-55, bateau_coord[2], bateau_coord[2]);
	}
	img = document.getElementById("bateau_img");
    ctx.drawImage(img, bateau_coord[0], bateau_coord[1], bateau_coord[2]-20, bateau_coord[2]);

}

function sautBateau(){
	if (bateau_coord[1] == hauteurInitialeBateau){
			vitesseBateau[1] = -1;
			enSaut = 1;
	}
}

function updateBateau(){
	bateau_coord[1] = bateau_coord[1] + vitesseBateau[1];
	if (enSaut == 1){
		if (Math.abs(vitesseBateau[1]) < 0.10){
			vitesseBateau[1] = vitesseBateau[1] + 0.005;
		}
		else if (vitesseBateau[1] < 1){
			vitesseBateau[1] = vitesseBateau[1] + 0.012;
		}
		if (bateau_coord[1] > hauteurInitialeBateau){
			vitesseBateau[1] = 0;
			bateau_coord[1] = hauteurInitialeBateau;
			enSaut = 0;
			compteurVague = 40;
		}
	}
	drawVague1();
}
function drawVague1(){
	if (compteurVague > 20 && enSaut==0){
	var img = document.getElementById("ecla");
	ctx.drawImage(img, bateau_coord[0]+bateau_coord[2]/2-20, bateau_coord[1], bateau_coord[2], bateau_coord[2]);
		compteurVague = compteurVague - 1;
	}
	else if (compteurVague > 0 && enSaut == 0){
	var img = document.getElementById("ecla");
	ctx.drawImage(img, bateau_coord[0]+bateau_coord[2]/2+16-20, bateau_coord[1]+14, bateau_coord[2]/2, bateau_coord[2]/2);
		compteurVague = compteurVague - 1;
	}
}

function drawVague2(){
	if (enSaut == 0){
		var img = document.getElementById("ecla");
		ctx.drawImage(img, bateau_coord[0]-16, bateau_coord[1]+15, bateau_coord[2]/2, bateau_coord[2]/2);
	}
}

function drawFond(){
		var img = document.getElementById("fond");
		ctx.drawImage(img, positionFond, -40, 400, 250);
		var img = document.getElementById("nuit");
		ctx.drawImage(img, positionFond-400, -40, 400, 250);
		ctx.drawImage(img, positionFond+400, -40, 400, 250);
		var img = document.getElementById("404tuyau");
		ctx.drawImage(img, positionFond+260, 10, 50, 50);
		var img = document.getElementById("404tuyau2");
		ctx.drawImage(img, positionFond+400+260-35, 10, 50, 50);
		ctx.drawImage(img, positionFond-400+260-35, 10, 50, 50);
}

function checkdead(){
	for (var i = 0; i < tailleBox; i++){
		if (boxs[i][0] < bateau_coord[2]-20 && boxs[i][0] > bateau_coord[0]){
			if (hauteurInitialeBateau - bateau_coord[1] < 10){
				snd.pause();
				var snd2 = new Audio("img/sound_explo.wav"); // buffers automatically when created
				snd2.loop = false;
				snd2.volume = 0.25;
				snd2.play();
				var img = document.getElementById("explo");
				ctx.drawImage(img, bateau_coord[0]+10, bateau_coord[1], 50,50);
				gamePaused = 1;
			}
		}
	}
}

function draw() {
	if (gamePaused == 0){
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    drawFond();
	    updatePosObstacles();
	    updateBateau();
	    drawObstacles();
	    drawMer();
	    drawBateau();
	    drawBoxs();
	    drawMigrant();
	    checkdead();
	    ctx.fillStyle="#FFFFFF";
	    ctx.font="9px Georgia";
		ctx.fillText("Réfugiés sauvés : " + compteurMigrants,200,10);
	}else{
		if (gameStarted == 0){
			dispInstruc();
		}else{
			setInterval(dispScore, 1500);
		}
	}
}

function dispScore(){
	if (gamePaused == 1){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle="#000000";
		ctx.font="12px Georgia";
		ctx.fillText("Réfugiés sauvés : " + compteurMigrants,20,50);
		ctx.fillText("Réessayer : <Espace>",20,80);
		for (var i = 0; i < compteurMigrants; i++){
			if (i%2 == 0){
				var img = document.getElementById("human1");
			}else{
				var img = document.getElementById("human2");
			}
	    	ctx.drawImage(img, 140+i*5, 20+i*5, bateau_coord[2]/6, bateau_coord[2]/2);
		}
		//setTimeout(dispScore,500);
	}
}

function dispInstruc(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle="#000000";
	ctx.font="12px Georgia";
	ctx.fillText("Sauvez les réfugiés en évitant les mines !",20,50);
	ctx.fillText("Démarrer : <Espace>",20,130);


	var img = document.getElementById("human1");
    ctx.drawImage(img, 94, 55, bateau_coord[2]/6, bateau_coord[2]/2);
   	img = document.getElementById("human2");
   	ctx.drawImage(img, 90 + 17, 55, bateau_coord[2]/6, bateau_coord[2]/2);
	var img = document.getElementById("bateau_img2");
    ctx.drawImage(img, 90, 72, bateau_coord[2]/2, bateau_coord[2]/2);
    img = document.getElementById("rame");
    ctx.drawImage(img, 90, 72, bateau_coord[2]/2, bateau_coord[2]/2);


	img = document.getElementById("barril");
	ctx.drawImage(img, 230, 60, 15,30);
}

setInterval(draw, 5);

});