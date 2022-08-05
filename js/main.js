// Sounds
let deathSound = new Audio('../sounds/death.mp3')
deathSound.volume = 0.15

let enemyDeath =  new Audio('../sounds/enemyDeath.mp3')
enemyDeath.volume = .1

let beep = new Audio("../sounds/ah.mp3")
let ambient = new Audio('../sounds/ambient.mp3')

beep.volume = 0.02
ambient.volume = 0.02



// ambient.play()

var resp = ambient.play();

if (resp !== undefined) {
    resp.then(_ => {
        ambient.play()
    }).catch(error => {
        // ambient.play()
    });
}

//ktman.style.scale = 3


// Images

let platformImg = new Image()
platformImg.src = './img/platform.png'

let platformSmallImg = new Image()
platformSmallImg.src = './img/platformSmallTall.png'

let hills = new Image()
hills.src = './img/hills.png'

let background = new Image()
background.src = './img/background.png'

let bulletSprite = new Image()
bulletSprite.src = './img/disk.png'


//Blender----------------
let blenderBullet = new Image()
blenderBullet.src = './img/blender/blenderBullet.svg'

let blenderStayRight = new Image()
blenderStayRight.src = './img/blender/blender-stayRight.svg'

let blenderStayLeft = new Image()
blenderStayLeft.src = './img/blender/blender-stayLeft.svg'

let blenderRunLeft = new Image()
blenderRunLeft.src = './img/blender/blender-runLeft.svg'

let blenderRunRight = new Image()
blenderRunRight.src = './img/blender/blender-runRight.svg'

let blenderShootingRight = new Image();
blenderShootingRight.src = './img/blender/blender-shootingRight.svg'

let blenderShootingLeft = new Image();
blenderShootingLeft.src = './img/blender/blender-shootingLeft.svg'

// c.drawImage(blenderBullet,
//     7 * this.bulletFrames + this.bulletFrames,0,
//     7, 4,
//     this.x,
//     this.y,
//     this.width,
//     this.height);
//-----------------------

//KTMAN------------------
let ktmanStayRight = new Image()
ktmanStayRight.src = './img/ktman/ktman-stayAnim.svg'

let ktmanStayLeft = new Image()
ktmanStayLeft.src = './img/ktman/ktman-stayLeft.png'

let ktmanDisk = new Image()
ktmanDisk.src = './img/ktman/ktmanDisk.svg'


//-----------------------



// --------------------------------------------------


const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.8

class Player {
    constructor() {
        this.speed = 5
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 40
        this.height = 60
        this.velocity = {
            x: 0,
            y: 0
        }
        this.directionRight = true;
        this.isGround = false;
        this.frames = 0;
        this.character = 'blender'  // blender/ktman

    }
    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        if(this.character == 'ktman')
        {
            c.drawImage(ktmanStayRight,
            12 * this.frames,0,
            12, 17,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
        }
        else if(this.character == 'blender')
        {
           
            if(shooting == true && shootingDirectionRight == true)
            {
                c.drawImage(blenderShootingRight,
                    15 * this.frames + this.frames,0,
                    15, 18,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height);
            }
            else if(shooting == true && shootingDirectionRight == false)
            {
                c.drawImage(blenderShootingLeft,
                    15 * this.frames + this.frames,0,
                    15, 18,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height);
            }
            else if(keys.left.pressed)
            {

                c.drawImage(blenderRunLeft,
                    15 * this.frames + this.frames,0,
                    15, 18,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height);
            }
            else if(keys.right.pressed)
            {
                c.drawImage(blenderRunRight,
                    15 * this.frames + this.frames,0,
                    15, 18,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height);
            }
            else if( watchRight && !keys.right.pressed && !keys.left.pressed)
            { 
                c.drawImage(blenderStayRight,
                    15 * this.frames + this.frames,0,
                    15, 18,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height);
            }
            else if( !watchRight && !keys.right.pressed && !keys.left.pressed)
            {
                c.drawImage(blenderStayLeft,
                    15 * this.frames + this.frames,0,
                    15, 18,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height);
            }
            
        }
    }

    update() {
        if(this.character == 'ktman')
        {
            this.width = 40;
            this.height = 60;
        }
        else if(this.character == 'blender')
        {
            this.width = 45;
            this.height = 54;
        }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)this.velocity.y += gravity
    }
}

//UPDATE//
    setInterval(()=>{
        if(player.character == 'ktman')
        {
            player.frames++
            if(player.frames > 24) player.frames = 0;
        }
        
    }, 30)
    setInterval(()=>{
        if(player.character == 'ktman')
        {
            bullets.forEach(bullet => {
                bullet.bulletFrames++
                if(bullet.bulletFrames > 1) bullet.bulletFrames = 0;
            })
        }
    }, 200)

    setInterval(()=>{
        if(player.character == 'blender')
        {
        bullets.forEach(bullet => {
            bullet.bulletFrames++
            if(bullet.bulletFrames > 23) bullet.bulletFrames = 0;
        })
        }
    }, 50)

    setInterval(()=>{

    if(player.character == 'blender')
    {
        player.frames++
        if(player.frames > 2) player.frames = 0;
    }

    }, 300)
    
//------//


class Enemy {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 40
        this.height = 40
    }
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y,
            this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}


class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)

    }
}


class GenericObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Bullet {
    constructor (x, y, color, width, height, velocity, target) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = velocity
        this.width = width
        this.height = height
        this.bulletFrames = 0
        this.needReturn = false
        this.target = target
    }

    draw() {

        //c.fillStyle = this.color
        //c.fillRect(this.x, this.y, this.width, this.height)
        if(player.character == 'ktman')
        {
            c.drawImage(ktmanDisk,
                12 * this.bulletFrames + this.bulletFrames,0,
                12, 12,
                this.x,
                this.y,
                this.width,
                this.height);
        }
        else if( player.character == 'blender')
        {
            //c.fillStyle = this.color
            //c.fillRect(this.x, this.y, this.width, this.height)
            c.drawImage(blenderBullet,
                7 * this.bulletFrames + this.bulletFrames,0,
                7, 4,
                this.x,
                this.y,
                this.width,
                this.height);
        }

    }
    intarget() {
        
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 

        enemies.forEach(enemy => {
            if (this.x < enemy.position.x + enemy.width &&
                this.x + this.width > enemy.position.x &&
                this.y < enemy.position.y + enemy.height &&
                this.height + this.y > enemy.position.y){
                    this.needReturn = true
                    enemy.velocity += 100
                    enemyDeath.play()
                if(player.character == 'blender')
                    if (bullets.indexOf(this) !== -1) 
                        bullets.splice(bullets.indexOf(this), 1);
            }
        })

        if(player.character == 'ktman')
        {
            if ( this.x < this.target.x &&
                 this.x + this.width > this.target.x &&
                 this.y < this.target.y &&
                 this.y + this.height > this.target.y)
        
            {
                this.needReturn = true;        
            }
        }
    }
    return() {
        this.draw()
        

        const angle = Math.atan2((player.position.y + player.height / 2) - (this.y + this.height / 2),
         (player.position.x + player.width / 2) - (this.x + this.width / 2))
        // console.log(angle);
        
        
            this.velocity.x = Math.cos(angle) *8,
            this.velocity.y =  Math.sin(angle) *8

            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y
    


        
        //Видалення кулі
        if (this.x < player.position.x + player.width && 
            this.x + this.width > player.position.x &&
            this.y < player.position.y + player.height &&
            this.height + this.y > player.position.y){
                if (bullets.indexOf(this) !== -1) {
                    bullets.splice(bullets.indexOf(this), 1);
                }  
        }

        enemies.forEach(enemy => {
        //Смерть ворогам! Слава Україні
        if (this.x < enemy.position.x + enemy.width &&
            this.x + this.width > enemy.position.x &&
            this.y < enemy.position.y + enemy.height &&
            this.height + this.y > enemy.position.y){
                this.needReturn = true
                enemy.velocity += 100
                enemyDeath.play()
        }
        })


    }
}



// Змінні ------------------------------------------------------------------------------


let player = new Player()

let watchRight = true;

let bulletCD = false;

let shooting = false;
let shootingDirectionRight = false;

let platforms = []

let genericObject = []

let bullets = []

let enemies = []

canvas.addEventListener('click', (event) => {

   if(player.character == 'ktman' && bullets.length <= 0 )
   {

        const angle = Math.atan2(event.offsetY - ((player.position.y ) + player.height / 2), event.offsetX - ((player.position.x ) + player.width / 2))
        // console.log(angle);
        console.log((player.position.x + player.width / 2))
        const velocity = {
            x: Math.cos(angle) * 6.5,
            y: Math.sin(angle) * 6.5
        }
        
        const target = {
            x: event.offsetX,
            y: event.offsetY
        }
        let bullet = new Bullet(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2,
            'yellow',
            36,
            36,
            velocity,
            target
        )
        bullet.x -= 18;
        bullet.y -= 18;
        // console.log(bullet)
        setTimeout(()=>{
            bullet.needReturn = true;
        }, 1000)

        

        // bullet.position.x = player.position.x + (player.width / 2) - (bullet.width / 2);
        // bullet.position.y = player.position.y + (player.height / 2) - (bullet.height / 2)
        beep.play()
        bullets.push(bullet)
    }
    else if(player.character == 'blender' && !bulletCD)
    {
        
        shooting = true  //СТАТУС СТРІЛЬБИ ДЛЯ АНІМАЦІЇ
        bulletCD = true  //КУЛЛДАУН ВИСТРІЛА
        const angle = Math.atan2(event.offsetY - ((player.position.y ) + player.height / 2),
                                 event.offsetX - ((player.position.x ) + player.width / 2))
        const velocity = {
           x: Math.cos(angle) * 10,
           y: Math.sin(angle) * 10
        }
       
       const target = {
           x: event.offsetX,
           y: event.offsetY
        }
       let bullet = new Bullet(
           player.position.x + player.width / 2,
           player.position.y + player.height / 2,
           'yellow',
           28,
           16,
           velocity,
           target
       )
       

        beep.play()
        bullets.push(bullet)
        // console.log(bullets)

        if(bullet.target.x > player.position.x) //ВИЗНАЧЕННЯ НАПРЯМКУ КУЛІ ВЛІВО/ВПРАВО
        {
            shootingDirectionRight = true;
        }
        else if(bullet.target.x <= player.position.x)
        {
            shootingDirectionRight = false;
        }
        
        setTimeout(()=>{
            if (bullets.indexOf(bullet) !== -1) {
                bullets.splice(bullets.indexOf(bullet), 1);
            } 
        }, 1000)
        setTimeout(()=>{
            bulletCD = false
            shooting = false
        }, 300)
        setTimeout(()=>{
        shooting = false
        }, 900)
    }
})






// Init Function ------------------------------------------------------------------------------

function init() {

    player = new Player()

    enemies = [
        new Enemy({
            x: 700,
            y: 100
        }),
        new Enemy({
            x: 400,
            y: 100
        }),
        new Enemy({
            x: 900,
            y: 100
        }),
        new Enemy({
            x: 530,
            y: 300
        })
    ]

    platforms = [
        new Platform({
            x: platformImg.width * 4 + 300 - 3 + platformImg.width - platformSmallImg.width,
            y: 350,
            image: platformSmallImg,

        }),
        new Platform({
            x: platformImg.width - 6 - platformSmallImg.width + 100,
            y: 245,
            image: platformSmallImg,
        }),
        new Platform({
            x: platformImg.width - 3 - platformSmallImg.width,
            y: 360,
            image: platformSmallImg,
        }),
        new Platform({
            x: -1,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width - 4 + platformSmallImg.width,
            y: 360,
            image: platformSmallImg,
        }),
        new Platform({
            x: platformImg.width - 3,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 2 + 100,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 3 + 300,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 4 + 300 - 3,
            y: 470,
            image: platformImg,
        }),
        new Platform({
            x: platformImg.width * 5 + 550 - 3,
            y: 470,
            image: platformImg,
        }),
    ]

    genericObject = [
        new GenericObject({
            x: -1,
            y: -1,
            image: background
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image: hills
        })
    ]


    scrollOffset = 0

}


// Keys Array --------------------------------------------------------------------------------

const keys = {
    space: {
        pressed: false
    },
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    down: {
        pressed: false,
        isDownAlready: false
    }
}



let scrollOffset = 0


// Animate ---------------------------------------------------------------------------------------

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObject.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })

    player.update()

    enemies.forEach(enemy => {
        enemy.update()
    })

    
    

    bullets.forEach(bullet => {
        
        if(player.character == 'ktman')
        {
            if(bullet.needReturn == false)
            {
                bullet.intarget()    
            }
            else{
                bullet.return();   
            }
        }
        else if(player.character == 'blender')
        {
            bullet.intarget()  
        }
        
    })


    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if (
        (keys.left.pressed && player.position.x > 200) ||
        (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
    ) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0
        

        if (keys.right.pressed) {
            scrollOffset += player.speed

            enemies.forEach(enemy => {
                enemy.position.x -= player.speed
            })
            
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })

            bullets.forEach(bullet => {
                bullet.x -= player.speed
                // bullet.target.a -= player.speed
            })

            genericObject.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.5
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed

            enemies.forEach(enemy => {
                enemy.position.x += player.speed
            })

            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            
            bullets.forEach(bullet => {
                bullet.x += player.speed
                // bullet.target.a += player.speed
            })

            genericObject.forEach(genericObject => {
                genericObject.position.x += player.speed * 0.5
            })
        }
        
      
    }



    // Platform collision -----------------------------------------------------------------

    platforms.forEach(platform => {
        //Player on platform ---------------------------------------------------------
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height
            + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
            player.isGround = true
        }
       //Enemy on platform ------------------------------------------------------------

       enemies.forEach(enemy => {
        if (enemy.position.y + enemy.height <= platform.position.y && enemy.position.y + enemy.height
            + enemy.velocity.y >= platform.position.y && enemy.position.x + enemy.width >= platform.position.x
            && enemy.position.x <= platform.position.x + platform.width) {
            enemy.velocity.y = 0;
        }
       })
    })

    platforms.forEach(platform => {
        // ---- Майбутній зпуск з платформи
        //     Далі буде
    })




    // enemy collision

    enemies.forEach(enemy => {
        if (player.position.y + enemy.height <= enemy.position.y && player.position.y + player.height
            + player.velocity.y >= enemy.position.y && player.position.x + player.width >= enemy.position.x
            && player.position.x <= enemy.position.x + enemy.width) {
            player.velocity.y -= 35
            player.isGround = false
            enemyDeath.play()
            enemy.velocity += 10
        }
    
        if (player.position.x < enemy.position.x + enemy.width &&
            player.position.x + player.width > enemy.position.x &&
            player.position.y < enemy.position.y + enemy.height &&
            player.height + player.position.y > enemy.position.y){
                deathSound.play()
                bullets = []
                init()
        }
        if (player.position.x < enemy.position.x + enemy.width + 200 &&
            player.position.x + player.width + 200 > enemy.position.x &&
            player.position.y < enemy.position.y + enemy.height + 200 &&
            player.height + 200 + player.position.y > enemy.position.y){
            enemy.position.x -= 5    
        }
    })


    
    // win
    if (scrollOffset > platformImg.width * 5 + 500 - 3) {
        console.log('You Win!');
    }

    // lose
    if (player.position.y > canvas.height){
        deathSound.play()
        bullets = []
        init()
    }


}




init()
animate()


let timer
let goDown;

addEventListener('keydown', ({ keyCode }) => {
     
    switch (keyCode) {
        case 65: //LEFT
            keys.left.pressed = true
            watchRight = false;
            break
        case 83:  //DOWN
           // if(!timer && keyCode === 83 && player.position.y < 500){
          //      player.isGround = false
          //      timer = setTimeout(()=>(timer = clearTimeout(timer)), 1000);
          //  }
          if (player.isGround) {
            player.velocity.y = 1
            player.isGround = false
        }
        if(player.position.y > 400){
           player.velocity.y = 0
        }
            break
        case 68: //RIGHT

            keys.right.pressed = true
            watchRight = true;
            break
        case 87: //UP

            if (player.isGround) {
                player.velocity.y -= 20
                player.isGround = false
            }
            break
        case 32:  //SPACE
            if (player.isGround) {
                player.velocity.y -= 20
                player.isGround = false
            }
            break
        case 82:  //R
            if(player.character == 'ktman')
            {
                
                deathSound.play()
                bullets = []
                init()
                player.character = 'blender'
                
            }
            else{
                
                deathSound.play()
                bullets = []
                init()
                player.character = 'ktman'
            }
        break
    }
})



addEventListener('keyup', ({ keyCode }) => {


    // console.log(keyCode)
    switch (keyCode) {
        case 65:
            keys.left.pressed = false
            break
        case 83: //DOWN

            // console.log('up now')
            keys.down.pressed = false
            keys.down.isDownAlready = false
            break
        case 68:
            keys.right.pressed = false
            break
        case 87:
            break
    }
})

