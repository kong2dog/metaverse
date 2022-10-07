

在十月份的一天，我突发奇想，想利用已有的知识在24小时内开发出一款3D多人即时射击游戏，也就是类似CS的那种游戏。

话不多说，开干，首先要实现这样一套系统，要用到的技术栈包含以下几个：

* WebSocket
* Babylonjs
* WebGL
* Nodejs
* Nginx
最后设计出的架构图如下所示：

![图片](https://github.com/kong2dog/metaverse/raw/main/static/d.png)


首先，websocket方面，我考察了socket.io, mqtt 和 ws这三个包，他们各自的优缺点如下：

* Socket.io
    * 优点：
        * 开箱即用，封装的比较好
        * 前后端支持比较好
        * 比较成熟
    * 缺点：
        * 最大的缺点就是无法保持时序性，也就是socket.io发送的消息是没办法保证前后顺序的，这一点也让我直接pass掉了socket.io
        * 性能相对较差
* Mqtt
    * 优点：
        * 性能卓越
        * 体积小
    * 缺点：
        * mqtt协议是为工作在低带宽,不可靠网络的远程传感器和控制设备通讯而设计的协议,而Socket则是为了浏览器与服务器全双工通信的一种协议。因为是基于udp的，所以无法保证到达性，不可靠，也让我直接pass掉了mqtt
* ws
    * 优点：
        * 时序有保证，性能比较好
        * 包体积小，容易拓展
        * 可靠性高
    * 缺点：
        * 因为比较原始，所以很多方法要自己写，像存活检查和广播的方法都需要自己去扩展
        * 要求对socket编程有一定的了解。
最后在朋友的推荐下，我选择了ws这个包，这个包只对socket进行了最基本的封装，可以说是非常简洁，同时性能也有保证，此处这个包也很方便去拓展和改造，也是最适合我的选择。

其次，在threejs和babylonjs之间，我需要选出webgl的引擎，因为公司的项目都是采用的threejs，所以我对threejs算是比较熟悉，threejs的优点很多，上手也非常快，不过我最后还是选择了babylonjs作为开发引擎，这样的选择并不是说threejs不好，而是因为一方面我想学一下babylonjs，了解一下其与threejs的区别，另一方面babylonjs的框架本身就是游戏框架，对于游戏开发的支持度较高。

开发引擎选好了，接着我就开始了场景的开发和模型的构建。

![图片](https://github.com/kong2dog/metaverse/raw/main/static/e.png)


这里我用的是minecraft风格的模型，手里拿的是一把AK，同时我也生成了行走和开枪的动画。

代码如下：

```plain

   
    
    const faceColors = [];
    // 头部
    this.head = new BABYLON.MeshBuilder.CreateBox("head", {width: 1, height: 0.8, faceColors: faceColors}, this.Scene); 
    this.head.material = new BABYLON.StandardMaterial("headm", this.Scene);
    this.head.parent = this.player;
    const indices = this.head.getIndices();
    const positions = this.head.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    let colors = this.head.getVerticesData(BABYLON.VertexBuffer.ColorKind);        
    const nbVertices = positions.length / 3;
    if (!colors) {
        colors = new Array(4 * nbVertices);
        colors = colors.fill(1);
    }
    let vertex;
    for (var i = 0; i < 6; i++) {
        vertex = indices[3 * 0 + i];
        colors[4 * vertex] = 1;
        colors[4 * vertex + 1] = 1;
        colors[4 * vertex + 2] = 0;
        colors[4 * vertex + 3] = 1;
    }
    this.head.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
    this.head.locallyTranslate(new BABYLON.Vector3(0, 0.4, 0));;

    // 头发
    const hair = new BABYLON.MeshBuilder.CreateBox("hair", {width: 1, height: 0.2}, this.Scene);
    hair.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.1, 0))
    hair.parent = this.head;
    hair.locallyTranslate(new BABYLON.Vector3(0, 0.5, 0));;
    hair.material = new BABYLON.StandardMaterial("hairm", this.Scene);
    hair.material.diffuseColor = new BABYLON.Color3(0.61, 0.23, 0.29);
    
    // 身体
    this.body = new BABYLON.MeshBuilder.CreateBox("body", {width:1.2, height: 1.2, depth: 0.5}, this.Scene);
    this.body.parent = this.player;
    this.body.material = new BABYLON.StandardMaterial("bodym", this.Scene);
    this.body.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    this.body.locallyTranslate(new BABYLON.Vector3(0, -0.6, 0));
    
    // 屁股
    const but = new BABYLON.MeshBuilder.CreateBox("but", {width:1.25, height: 0.4, depth: 0.55}, this.Scene);
    but.parent = this.body;
    but.material = new BABYLON.StandardMaterial("butm", this.Scene);
    but.material.diffuseColor = new  BABYLON.Color3(0.1, 0.1, 0.1);
    but.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));
    
    // 左上臂
    this.leftarm = new BABYLON.MeshBuilder.CreateBox("leftupperarm", {width:0.4, height: 0.8, depth: 0.4}, this.Scene);
    this.leftarm.material = new BABYLON.StandardMaterial("leftupperarmm", this.Scene);
    this.leftarm.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    this.leftarm.parent = this.player;
    this.leftarm.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
    this.leftarm.locallyTranslate(new BABYLON.Vector3(-0.9, -0.4, 0));
    
    // 左肘
    this.leftelbow = new BABYLON.MeshBuilder.CreateBox("leftelbow", {width:0.4, height: 0.2, depth: 0.4}, this.Scene);
    this.leftelbow.material = new BABYLON.StandardMaterial("leftelbowm", this.Scene);
    this.leftelbow.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    this.leftelbow.parent = this.leftarm;
    this.leftelbow.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));
    
    // 左下臂
    this.leftlowerarm = new BABYLON.MeshBuilder.CreateBox("leftlowerarm", {width:0.4, height: 0.8, depth: 0.4}, this.Scene);
    this.leftlowerarm.material = new BABYLON.StandardMaterial("leftlowerarmm", this.Scene);
    this.leftlowerarm.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    this.leftlowerarm.parent = this.leftarm;
    this.leftlowerarm.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
    this.leftlowerarm.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));
    
    // 左腕
    const leftwaist = new BABYLON.MeshBuilder.CreateBox("leftwaist", {width:0.44, height: 0.1, depth: 0.44}, this.Scene);
    leftwaist.material = new BABYLON.StandardMaterial("leftwaistm", this.Scene);
    leftwaist.material.diffuseColor = new  BABYLON.Color3(1, 1, 1);
    leftwaist.parent = this.leftlowerarm;
    leftwaist.locallyTranslate(new BABYLON.Vector3(0, -0.4, 0));
    
    // 左手
    const lefthand = new BABYLON.MeshBuilder.CreateBox("lefthand", {width:0.4, height: 0.2, depth: 0.4}, this.Scene);
    lefthand.material = new BABYLON.StandardMaterial("lefthandm", this.Scene);
    lefthand.material.diffuseColor = new BABYLON.Color3(0.78, 0.27, 0.39);
    lefthand.parent = this.leftlowerarm;
    lefthand.locallyTranslate(new BABYLON.Vector3(0, -0.55, 0));
    
    // 右上臂
    this.rihgtupperarm = new BABYLON.MeshBuilder.CreateBox("rihgtupperarm", {width:0.4, height: 0.8, depth: 0.4}, this.Scene);
    this.rihgtupperarm.material = new BABYLON.StandardMaterial("rihgtupperarmm", this.Scene);
    this.rihgtupperarm.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    this.rihgtupperarm.parent = this.player;
    this.rihgtupperarm.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
    this.rihgtupperarm.locallyTranslate(new BABYLON.Vector3(0.9, -0.4, 0));

    // 右肘
    const rihgtelbow = new BABYLON.MeshBuilder.CreateBox("rihgtelbow", {width:0.4, height: 0.2, depth: 0.4}, this.Scene);
    rihgtelbow.material = new BABYLON.StandardMaterial("rihgtelbowm", this.Scene);
    rihgtelbow.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    rihgtelbow.parent = this.rihgtupperarm;
    rihgtelbow.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));
     
    // 右下臂
    this.rihgtlowerarm = new BABYLON.MeshBuilder.CreateBox("rihgtlowerarm", {width:0.4, height: 0.8, depth: 0.4}, this.Scene);
    this.rihgtlowerarm.material = new BABYLON.StandardMaterial("rihgtlowerarmm", this.Scene);
    this.rihgtlowerarm.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    this.rihgtlowerarm.parent = this.rihgtupperarm;
    this.rihgtlowerarm.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
    this.rihgtlowerarm.locallyTranslate(new BABYLON.Vector3(0, -0.8, 0));
    
    // 右腕
    const rihgtwaist = new BABYLON.MeshBuilder.CreateBox("rihgtwaist", {width:0.44, height: 0.1, depth: 0.44}, this.Scene);
    rihgtwaist.material = new BABYLON.StandardMaterial("rihgtwaistm", this.Scene);
    rihgtwaist.material.diffuseColor = new  BABYLON.Color3(1, 1, 1);
    rihgtwaist.parent = this.rihgtlowerarm;
    rihgtwaist.locallyTranslate(new BABYLON.Vector3(0, -0.4, 0));
    
    // 右手
    const rihgthand = new BABYLON.MeshBuilder.CreateBox("rihgthand", {width:0.4, height: 0.2, depth: 0.4}, this.Scene);
    rihgthand.material = new BABYLON.StandardMaterial("rihgthandm", this.Scene);
    rihgthand.material.diffuseColor = new BABYLON.Color3(0.78, 0.27, 0.39);
    rihgthand.parent = this.rihgtlowerarm;
    rihgthand.locallyTranslate(new BABYLON.Vector3(0, -0.55, 0));
    
    // 左大腿
    this.leftleg = new BABYLON.MeshBuilder.CreateBox("leftupperleg", {width:0.5, height: 0.8, depth: 0.5}, this.Scene);
    this.leftleg.material = new BABYLON.StandardMaterial("leftupperlegm", this.Scene);
    this.leftleg.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    this.leftleg.parent = this.player;
    this.leftleg.setPivotMatrix(new BABYLON.Matrix.Translation(0, -0.4, 0))
    this.leftleg.locallyTranslate(new BABYLON.Vector3(-0.26, -2, 0));
    
    // 左膝盖
    const leftkneel = new BABYLON.MeshBuilder.CreateBox("leftkneel", {width:0.5, height: 0.2, depth: 0.5}, this.Scene);
    leftkneel.material = new BABYLON.StandardMaterial("leftkneelm", this.Scene);
    leftkneel.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    leftkneel.parent = this.leftleg;
    leftkneel.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));
    
    // 左小腿
    const leftlowerleg = new BABYLON.MeshBuilder.CreateBox("leftlowerleg", {width:0.5, height: 0.6, depth: 0.5}, this.Scene);
    leftlowerleg.material = new BABYLON.StandardMaterial("leftlowerlegm", this.Scene);
    leftlowerleg.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    leftlowerleg.parent = this.leftleg;
    leftlowerleg.locallyTranslate(new BABYLON.Vector3(0, -0.9, 0));
    
    // 左脚
    const leftfoot = new BABYLON.MeshBuilder.CreateBox("leftfoot", {width:0.5, height: 0.4, depth: 0.5}, this.Scene);
    leftfoot.material = new BABYLON.StandardMaterial("leftfootm", this.Scene);
    leftfoot.material.diffuseColor = new  BABYLON.Color3(0.1, 0.1, 0.1);
    leftfoot.parent = this.leftleg;
    leftfoot.locallyTranslate(new BABYLON.Vector3(0, -1.4, 0));
    
    // 右大腿
    this.rightleg = new BABYLON.MeshBuilder.CreateBox("rightupperleg", {width:0.5, height: 0.8, depth: 0.5}, this.Scene);
    this.rightleg.material = new BABYLON.StandardMaterial("rightupperlegm", this.Scene);
    this.rightleg.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    this.rightleg.parent = this.player;
    this.rightleg.locallyTranslate(new BABYLON.Vector3(0.26, -2, 0));
    
    // 右膝盖
    const rightkneel = new BABYLON.MeshBuilder.CreateBox("rightkneel", {width:0.5, height: 0.2, depth: 0.5}, this.Scene);
    rightkneel.material = new BABYLON.StandardMaterial("rightkneelm", this.Scene);
    rightkneel.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    rightkneel.parent = this.rightleg;
    rightkneel.locallyTranslate(new BABYLON.Vector3(0, -0.5, 0));

    // 右小腿
    const rightlowerleg = new BABYLON.MeshBuilder.CreateBox("rightlowerleg", {width:0.5, height: 0.6, depth: 0.5}, this.Scene);
    rightlowerleg.material = new BABYLON.StandardMaterial("rightlowerlegm", this.Scene);
    rightlowerleg.material.diffuseColor = new  BABYLON.Color3(0.2, 0.2, 0.2);
    rightlowerleg.parent = this.rightleg;
    rightlowerleg.locallyTranslate(new BABYLON.Vector3(0, -0.9, 0));
    
    // 右脚
    const rightfoot = new BABYLON.MeshBuilder.CreateBox("rightfoot", {width:0.5, height: 0.4, depth: 0.5}, this.Scene);
    rightfoot.material = new BABYLON.StandardMaterial("rightfootm", this.Scene);
    rightfoot.material.diffuseColor = new  BABYLON.Color3(0.1, 0.1, 0.1);
    rightfoot.parent = this.rightleg;
    rightfoot.locallyTranslate(new BABYLON.Vector3(0, -1.4, 0));
```
这里与threejs不同的是，每次创建几何体都要将scene的实例传入，而不是生成后添加到scene中，另外还有一点不同的是babylonjs每个几何体的锚点位置都在模型的中央，所以在计算相对位置的时候要把模型的高度宽度也要考虑进去。但是babylonjs比较方便的一点是可以设置每个面的材质，甚至每个顶点的材质，比如这个人物的脸我就单独设置成了黄色，而头部其他的面则是白色。
在生成了人物之就要开始控制他的前后左右和开枪的动作，代码：

```plain
// 行走
run() {
    const run = new BABYLON.AnimationGroup("run");
    const frameRate = 5;

    const leftanime = new BABYLON.Animation("xSlide", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keyFrames = [];

    keyFrames.push({
        frame: 0,
        value: -Math.PI / 4,
    });

    keyFrames.push({
        frame: frameRate,
        value: Math.PI / 4,
    });

    keyFrames.push({
        frame: 2 * frameRate,
        value: -Math.PI / 4,
    });

    leftanime.setKeys(keyFrames);

    const rightanime = new BABYLON.Animation("xSlide", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const rightkeyFrames = [];

    rightkeyFrames.push({
        frame: 0,
        value: Math.PI / 4,
    });

    rightkeyFrames.push({
        frame: frameRate,
        value: -Math.PI / 4,
    });

    rightkeyFrames.push({
        frame: 2 * frameRate,
        value: Math.PI / 4,
    });

    rightanime.setKeys(rightkeyFrames);

    run.addTargetedAnimation(leftanime, this.leftleg);
    run.addTargetedAnimation(rightanime, this.rightleg);
    run.normalize(0, 2 * frameRate);
    run.play(true);
  }
 // 开枪
 animate() {
    const start = this._initialRotation.clone();
    const end = start.clone();
    end.x += Math.PI/100;

    // Create the Animation object
    const display = new BABYLON.Animation(
        "fire",
        "rotation",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    // Animations keys
    const keys = [{ 
        frame: 0,
        value: start
    },{
        frame: 10,
        value: end
    },{
        frame: 100,
        value: start
    }];

    // Add these keys to the animation
    display.setKeys(keys);

    // Link the animation to the mesh
    this.mesh.animations.push(display);

    this.scene.Scene.beginAnimation(this.mesh, 0, 100, false, 10, function() {

    });
  }

```
接下来是websocket的编程，这里采用指令式的方式编程，涉及的指今一共有以下几种：
* setId 设置用户id，目前只支持英文和数字
* disconnect 断线或者下线
* request init game 初始化游戏
* update position 更新玩家位置
* hit player 击中玩家
* player fired shot 开枪
后端需要将对应的指令发送到对应的client，同时前端在收到指令后进行相应的操作。因为ws这个npm包没有广播的功能，所以这块的逻辑要自己来实现，具体的实现代码如下：

```plain
wss.clients.forEach((client) => {
  if (client !== wsclient && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({cmd: 'start render', player: player}));
  }
});
```

需要遍历所有连接到后端的client，再找出不是发送方的client，将指令发送过去。除此之外，我还通过setInterval的方法实现了socket的心跳检测。

```plain
const interval = setInterval(()=> {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      onClientDisconnect(ws)
      return;
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 3000);
```

然后实现运动更新的功能，这里需要通过控制摄像机的运动来模拟第一人称视角的运动，再将摄像机的运动后的位置和变换信息实时传给后端，后端再广播到其他的客户端，从而让用户的运动能够同步到别的客户端上。

前端代码实现：

```plain
updatePosition() {
    const xOffset = Math.abs(this.lastPosition.x - this.scene.camera.position.x);
    const yOffset = Math.abs(this.lastPosition.y - this.scene.camera.position.y);
    const zOffset = Math.abs(this.lastPosition.z - this.scene.camera.position.z);
    
    const xRotOffset = Math.abs(this.lastRotation.x - this.scene.camera.rotation.x);
    const yRotOffset = Math.abs(this.lastRotation.y - this.scene.camera.rotation.y);
    const zRotOffset = Math.abs(this.lastRotation.z - this.scene.camera.rotation.z);
    
    const posOffset = xOffset + yOffset + zOffset;
    const rotOffset = yRotOffset + xRotOffset + zRotOffset;

    if(posOffset > 0.1 || rotOffset > 0.01){ 
        this.submitMovement();
    } 
  }

  submitMovement() {
    this.scene.controller.sendLocalPlayerMovement(this.scene.camera.position, this.scene.camera.rotation);
    this.lastPosition = new BABYLON.Vector3(this.scene.camera.position.x - 0.3, this.scene.camera.position.y -0.5, this.scene.camera.position.z);
    this.lastRotation = new BABYLON.Vector3(this.scene.camera.rotation.x , this.scene.camera.rotation.y , this.scene.camera.rotation.z);
  }
  .....
  
 sendLocalPlayerMovement(pos, rot) {
        const position = { x: pos.x, y : pos.y , z : pos.z}; 
        const rotation = { x: rot.x, y : rot.y , z : rot.z};
        //更新位置信息到后端
        this.client.send(JSON.stringify({
            cmd: 'update position',
            pos: position,
            rot: rotation
        }))
    }
```
这里后端收到用户发送过来的位置信息后，会将位置信息广播给其他端：
```plain
function onUpdatePosition(wsclient, data) {
  const movedPlayer = playerById(wsclient.id);
  // 用户未找到
  if (!movedPlayer) {
    util.log("Player not found (onUpdatePosition): " + wsclient.id);
    return;
  } 
  // 更新服务器存储的用户的位置信息
  movedPlayer.setXYZ(data.pos.x, data.pos.y, data.pos.z); 
  movedPlayer.setRotXYZ(data.rot.x, data.rot.y, data.rot.z);      
  // 将新的用户位置广播给其他端
  wss.clients.forEach((client) => {
    if (client !== wsclient && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({cmd: 'move player', id: wsclient.id, rot : data.rot, pos : data.pos}));
    }
  });
}
```
其他端收到这些会更新相应的用户的位置信息；
```plain
  
  onMovePlayer(data) {
      this.movePlayer(data.id, data.pos, data.rot)
  }

  movePlayer(id, pos, rot) {
      const player = this._findPlayer(id);
      if(!player) return;
      player.move(pos, rot)
      player.player.setXYZ(pos.x, pos.y, pos.z);
      player.player.setRotXYZ(rot.x, rot.y, rot.z);
  }
```
这样就实现了位置信息的实时传输。
射击也是通过类似的方式来实现，这里要用到babylonjs里的一个检测碰撞的技巧，会通过pick函数选中屏幕正中的（也就是枪口指向的）Mesh的名字，如果是敌人的名字，那就给相应的敌人扣血，具体的信息同步的方式和同步位置的方式一致。

```plain
const pickResult = this.scene.Scene.pick(width/2, height/2, null, false, this.scene.camera);
  if(pickResult.pickedMesh){
    for(let i = 0; i < this.scene.store.state.remotePlayers.length; i++) {
      console.log(this.scene.store.state.remotePlayers[i].player)
      if(pickResult.pickedMesh.name === this.scene.store.state.remotePlayers[i].player._id){
        this.scene.controller.hitPlayer(this.scene.store.state.remotePlayers[i].player)
      }
    }
  }
```

到此，整个多人在线的3d实时射击游戏就基本成型了，包含了移动，射击的基本要素，因为是个人的兴趣项目，时间上不充裕，而且我并不是游戏开发相关专业的，对游戏开发并不是很熟悉，所以并没有加其他一些换枪，爆头动画等额外的功能，不过万变不离其宗，只要掌握了方法，增加这些功能来丰富细节也不是难事。

最后我也通过这个小小的个人项目，总结出了babylonjs和threejs的几个优缺点：

**首先与threejs不同的是，babylonjs每次创建几何体都要将场景实例传入，而不是创建好了之后再加到场景中，这一点有点反人类**，另外babylonjs每个几何体的锚点位置在模型中央，而且要创建了之后才能指定上级，所以在计算相对位置的时候也要比threejs要麻烦一点。

不过babylonjs的定制性非常高，可以设置每个面的材质，比如在这个游戏里我就把人的脸设置成黄色，头部其他面是白色。另外babylonjs相比threejs要成熟的多，很多库都内置的有，比如物理引擎，音乐处理，GUI界面全都内置，能做的事情也更多。

从渲染上来看，**babylonjs的渲染要更偏写实，而threejs的渲染的色彩饱和度更高，更明艳。**然而**babylonjs的调试不如threejs方便，很多helper都不提供**，甚至连坐标轴的绘制都要自己手动实现，辅助工具欠缺，对于向量的计算也不如threejs直观。而且babylonjs的使者人数相对threejs要少，在遇到问题时解决起来比较复杂。

总体而言，babylonjs的深度很深，对有研究专研和想深入渲染引擎的同学来说很不错，但threejs更简洁明了，很简单易用，更好上手，用的人也更多。

以上就是24小时内实现一整套的多人在线的3d射击游戏的全过程，希望能与各位一起交流分享，也希望各位能够喜欢这款游戏。

代码已经开源，感兴趣的朋友可以在线体验一下，也可以下载看看。

在线体验地址： [http://cs.hiotk.com](http://cs.hiotk.com)

源码地址：[https://github.com/kong2dog/metaverse](https://github.com/kong2dog/metaverse)

