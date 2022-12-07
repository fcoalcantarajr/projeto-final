var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 250},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('fundo', 'assets/000.png');
    this.load.image('colisor', 'assets/colisor.png');
    this.load.image('cesta', 'sprites/cesta/cesta.png');
    this.load.image('mickeymago0', 'sprites/mickeymago/000.png');
    this.load.image('mickeymago1', 'sprites/mickeymago/001.png');
    this.load.image('chao', 'assets/chao/chao.png')
    this.load.image('ovo', 'sprites/ovo/ovo.png')
}

function create ()
{
    this.add.image(400, 250, 'fundo');
    // colisor
    colisor = this.physics.add.staticGroup();
    colisor.create(400, 400, 'colisor');
    // chao
    chao = this.physics.add.staticGroup();
    chao.create(400, 500-51/2, 'chao');

    // mickey
    mickeymago = this.physics.add.staticGroup();
    mickeymago.create(400, 250+51*2, 'mickeymago1');
    // cesta
    cesta = this.physics.add.sprite(400-306/2, 300-51/2, 'cesta');
    cesta.setBounce(0.3);
    cesta.setCollideWorldBounds(true);
    //cesta.create(400-306/2, 250+51*2, 'cesta');

    //ovo
    ovoEsq = this.physics.add.sprite(250, 0, 'ovo');
    ovoEsq.setCollideWorldBounds(true);
    
    ovoDir = this.physics.add.sprite(250+306, 0, 'ovo');
    ovoDir.setBounce(0.3);
    ovoDir.setCollideWorldBounds(true);

    //gambiarra que segura a cesa
    this.physics.add.collider(cesta, colisor);
    
    //colisao do ovo com chao
    this.physics.add.collider(ovoEsq, chao);
    this.physics.add.collider(ovoEsq, cesta);
    this.physics.add.overlap(ovoEsq, cesta, coletarOvo, null, this);
    this.physics.add.destroy(ovoEsq);
    this.physics.add.collider(ovoDir, chao);
    this.physics.add.collider(ovoDir, cesta);
    

    cursors = this.input.keyboard.createCursorKeys();
}

function coletarOvo (ovoEsq)
{
    ovoEsq.disableBody(true, true);
}

function update ()
{
    function ovoEsq() {
        
    }

    timedEvent = this.time.addEvent({ delay: 6000000, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
    elapsedTime = timedEvent.getElapsedSeconds();
    
    if (elapsedTime == 100) {
        ovoEsq = this.physics.add.sprite(250, 0, 'ovo');
        ovoEsq.setCollideWorldBounds(true);
    }
    console.log(elapsedTime)
}