enchant(); 

window.onload = function() {
    var moveStageToCenter = function(core) {
        var stagePos = {
            top: (window.innerHeight - (core.height * core.scale)) / 2,
            left: (window.innerWidth - (core.width * core.scale)) / 2,
        };
        var stage = document.getElementById('enchant-stage');
        stage.style.position = 'absolute';
        stage.style.top = stagePos.top + 'px';
        stage.style.left = stagePos.left + 'px';
        core._pageX = stagePos.left;
        core._pageY = stagePos.top;
    };

    function removeScene(scene){
        while(scene.firstChild){
            scene.removeChild(scene.firstChild);
        }
    }

    var game_ = new Game(900, 1600); 
    game_.fps = 24; 
    game_.preload('./img/素材/ui/title.png'); 
	game_.preload('./img/素材/ui/tap.png'); 
    game_.preload('./img/素材/ui/tap2.png'); 
    game_.preload('./img/素材/ui/waku.png'); 
    game_.preload('./img/素材/ui/retry.png'); 
	game_.preload('./img/素材/1/背景1.png'); 
	game_.preload('./img/素材/1/前景1.png'); 
	game_.preload('./img/素材/1/オブジェクト1.png'); 
	game_.preload('./img/horiko.png'); 
	game_.preload('./img/ホコリ動きpng/ホリコ　動き　2.0.png'); 
    game_.preload('./img/ari.png');
    game_.preload('./img/nasi.png');
    game_.preload('./img/BGM.png');
    var score=0;

    moveStageToCenter(game_);
    
    var audioElem;
    audioElem = new Audio();
    audioElem.src = "./sound/sample.wav";
    audioElem.loop = true;

    game_.onload = function() { 

        //タイトルシーン   
        var TitleScene = function(){
            score=0;
            var scene = new Scene();                    
            var bg1 = new Sprite(900, 1600);            
			bg1.image = game_.assets['./img/素材/1/背景1.png']; 
			bg1.x = 0;                                 
			bg1.y = 0;                                 
			scene.addChild(bg1); 
            
            var pillar = new Sprite(900, 1600);        
			pillar.image = game_.assets['./img/素材/1/オブジェクト1.png']; 
			pillar.x = -130;                                 
			pillar.y = -400;                                 
			pillar.scale(1.5,1.5);
            scene.addChild(pillar); 

            var bg2 = new Sprite(900, 1600);           
			bg2.image = game_.assets['./img/素材/1/前景1.png']; 
			bg2.x = 0;                                 
			bg2.y = 0;                                 
			scene.addChild(bg2);  


            var title = new Sprite(225, 195);          
			title.image = game_.assets['./img/素材/ui/title.png']; 
			title.x = 640;                                 
			title.y = 40;                                 
			scene.addChild(title); 

            var tap = new Sprite(327, 144);            
			tap.image = game_.assets['./img/素材/ui/tap.png']; 
			tap.x = 400;                                 
			tap.y = 500;                                 
            tap.scale(1.6,1.6);
			scene.addChild(tap); 

           var horiko = new Sprite(250, 250);         
			horiko.image = game_.assets['./img/horiko.png'];
            
			horiko.x = 300;                                 
			horiko.y = 900;                                 
            horiko.scale(2,2);
            horiko.frame=6;

			scene.addChild(horiko);  


            scene.addEventListener(Event.TOUCH_START, function(e) {
                removeScene(scene);
                game_.replaceScene(GameScene());   
            });
            
            return scene;
        };

        //ゲームシーン
        var GameScene = function(){
            var scene = new Scene();
            

            var SCROLL_SPEED = 15;
            var SCROLL_DIST = 700;

            var bg1 = new Sprite(900, 1600);            
			bg1.image = game_.assets['./img/素材/1/背景1.png']; 
			bg1.x = 0;                                
			bg1.y = 0;                                
			scene.addChild(bg1); 
            
            var back_pillar = new Sprite(900, 1600);  
			back_pillar.image = game_.assets['./img/素材/1/オブジェクト1.png'];
			back_pillar.x = 1000;                                 
			back_pillar.y = 650;                                  
			back_pillar.scale(0.2,0.2);
            scene.addChild(back_pillar); 



            var horiko_img = new Sprite(250, 250);            
			horiko_img.image = game_.assets['./img/horiko.png']; 
            var col = new Sprite(150, 150);           
           // col.backgroundColor='#999999';   
            col.x = 50;
            col.y = 50;

            var horiko = new Group();
            horiko.addChild(col);
            horiko.addChild(horiko_img)
            horiko.x = 100;                    
			horiko.y = 300;          
			scene.addChild(horiko);   

            var pillars = [];
            
            for(var i=0;i<2;i++){

                var p_a = new Sprite(900, 1600);
                p_a.image = game_.assets['./img/素材/1/オブジェクト1.png'];
                p_a.x = 0;                                
                p_a.y = -700;                             
                p_a.scale(0.9,-0.9);

                var p_b = new Sprite(900, 1600);          
                p_b.image = game_.assets['./img/素材/1/オブジェクト1.png'];
                p_b.x = 0;                                 
                p_b.y = 700;                               
                p_b.scale(0.9,0.9);

                var col_a = new Sprite(280,1000);
                col_a.x = 170; 
                col_a.y = -460; 
                //col_a.backgroundColor='#999999';

                var col_b = new Sprite(280,1000);
                col_b.x = 170; 
                col_b.y = 1060; 
                //col_b.backgroundColor='#999999';

                var pillar = new Group();
                pillar.addChild(col_a);
                pillar.addChild(p_a);
                pillar.addChild(p_b);
                pillar.addChild(col_b);
                pillar.x=1000+i*SCROLL_DIST;
                pillar.y=Math.random()*600-300;
                pillars.push(pillar);
                scene.addChild(pillars[i]);

            } 
            var fg1 = new Sprite(900, 1600);          
			fg1.image = game_.assets['./img/素材/1/前景1.png'];
			fg1.x = 0;                                 
			fg1.y = 0;                               
			scene.addChild(fg1);  

            var fg2 = new Sprite(900, 1600);         
			fg2.image = game_.assets['./img/素材/1/前景1.png'];
			fg2.x = 900;                                 
			fg2.y = 0;                                 
			scene.addChild(fg2);  
 
           
            var ay = 1.5;
            var vy = 0;
            var flag = true;
            
            var label = new Label("SCORE");
                label.font = "90px Mamelon";
                label.x=340;
                label.y=320;
                label.color ="#ff8000";
            
            var scoreLabel = new Label("000");
                scoreLabel.font = "275px Mamelon";
                scoreLabel.color ="#ff8000";
            
            var maxWait = 4;
            var wait = 0;

            scene.addEventListener(Event.ENTER_FRAME, function() {
                if(flag){
                vy+=ay;
                horiko.y+=vy;
                back_pillar.x-=SCROLL_SPEED/3;
                if(back_pillar.x<-500){
                    back_pillar.x = 1000;
                }
                fg1.x-=SCROLL_SPEED;
                fg2.x-=SCROLL_SPEED;
                if (fg1.x <= -900) {                  
			        fg1.x = 900;                      
			    }
			    if (fg2.x <= -900) {                  
			        fg2.x = 900;                      
			    }
                if(horiko.lastChild.frame<6){
                    wait--;
                    if(wait<=0){
                        wait = maxWait;
                        horiko.lastChild.frame++;
                    }
                }


                for(var i=0;i<2;i++){
                    pillars[i].x-=SCROLL_SPEED;
                    if(pillars[i].x<=-500){
                        pillars[i].x = pillars[1-i].x+SCROLL_DIST;
                        pillars[i].y = Math.random()*600-300;
                        score++;
                    }
    		    	if(horiko.firstChild.intersect(pillars[i].firstChild)
                    ||horiko.firstChild.intersect(pillars[i].lastChild)
                    ){
                        gameover();

			    	}	
                }
				if(horiko.y<-50||horiko.y>1400){
                    gameover();

				}
                }
            });
            function gameover(){
                flag = false;
                audioElem.pause();
                var waku = new Sprite(150, 130);      
			    waku.image = game_.assets['./img/素材/ui/waku.png']; 
			    waku.x = 375;                                 
			    waku.y = 450;                                 
                waku.scale(4.5,4.5);
			    scene.addChild(waku); 

                scoreLabel.text = ""+score;
                scoreLabel.x = (game_.width - scoreLabel._boundWidth)/2;
                scoreLabel.y=440;
                scene.addChild(label);  
                scene.addChild(scoreLabel);  

                var tap = new Sprite(297, 137);            　
			    tap.image = game_.assets['./img/素材/ui/tap2.png']; 　
			    tap.x = 300;                                 　
			    tap.y = 1000;                                 　
                tap.scale(1.3,1.3);
			    scene.addChild(tap); 

                var retry = new Sprite(190, 190);            　
			    retry.image = game_.assets['./img/素材/ui/retry.png']; 　
			    retry.x = 355;                                 　
			    retry.y = 1200;                                 　
                retry.scale(1,1);
			    scene.addChild(retry); 

                retry.addEventListener(Event.TOUCH_START, function(e) {
                removeScene(scene);
                audioElem.currentTime =0 ;
                audioElem.play();
                game_.replaceScene(TitleScene());   
            });
            }

            scene.addEventListener(Event.TOUCH_START, function(e) {
                if(flag){
                    vy=-20;
                    horiko.lastChild.frame=0;
                }

            });
            return scene;
        };

        var SoundCheckScene = function(){
            var scene = new Scene();
            var bg1 = new Sprite(900, 1600);            　
			bg1.image = game_.assets['./img/素材/1/背景1.png']; 　
			bg1.x = 0;                                 　
			bg1.y = 0;                                 　
			scene.addChild(bg1);  

            
            var waku1 = new Sprite(150, 130);            　
			waku1.image = game_.assets['./img/素材/ui/waku.png']; 　
			waku1.x = 200;                                 　
			waku1.y = 800;                                 　
            waku1.scale(2,2);
			scene.addChild(waku1); 

            var waku2 = new Sprite(150, 130);            　
			waku2.image = game_.assets['./img/素材/ui/waku.png']; 　
			waku2.x = 550;                                 　
			waku2.y = 800;                                 　
            waku2.scale(2,2);
			scene.addChild(waku2); 

            var bgm = new Sprite(700, 504);            　
			bgm.image = game_.assets['./img/BGM.png']; 　
			bgm.x = 100;                                 　
			bgm.y = 300;                                 　
			scene.addChild(bgm);


            var ari = new Sprite(768, 504);            　
			ari.image = game_.assets['./img/ari.png']; 　
            ari.scale(0.4,0.4);
			ari.x = -105;                                 　
			ari.y = 620;                                 　
			scene.addChild(ari);

            var nasi = new Sprite(768, 504);            　
			nasi.image = game_.assets['./img/nasi.png']; 　
            nasi.scale(0.4,0.4);
			nasi.x = 245;                                 　
			nasi.y = 620;                                 　
			scene.addChild(nasi);  



            ari.addEventListener(Event.TOUCH_END, function(e) {
                audioElem.play();
                removeScene(scene);
                game_.replaceScene(TitleScene());    
            });
            nasi.addEventListener(Event.TOUCH_START, function(e) {
                audioElem.muted =true;
                removeScene(scene);
                game_.replaceScene(TitleScene());    
            });
            return scene;
        };


        game_.replaceScene(SoundCheckScene());

    }
    game_.start(); 



};
