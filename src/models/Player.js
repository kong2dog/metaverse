export default class Player {
	constructor(
		x, y, z
	) {
		this._name = 'No Name';
		this._x = x;
		this._y = y;
		this._z = z;
		this._rotX = 0;
		this._rotY = 0;
		this._rotZ = 0;
		this._id;
		this._color;
		this._hitPoints = 100;
		this._isDead = false;
		this._height = 6;

		this._deaths = 0;
		this._kills = 0;
	}

	setID(id) {
		this._id = id;
	}

	setName(name) {
		this._name = name;
	}

	setColor(r,g,b) {
		this._color = {
			r,g,b
		}
	}

	setXYZ(x, y, z) {
		this._x = x;
		this._y = y;
		this._z = z;
	}

	getXYZ() {
		return {x : this._x, y : this._y , z : this._z};
	}

	setRotXYZ(x, y, z) {
		this._rotX = x;
		this._rotY = y;
		this._rotZ = z;
	}

	hit() {
		this._hitPoints -= 19;
		if(this._hitPoints <= 0){
			this._isDead = true;
		}
		return this._isDead;
	}

	setDead(d) {
		this._isDead = d;
	}

	setHitPoints(h) {
		if(h > 100) h = 100;
		else if(h < 0) h = 0;
		this._hitPoints = h;
	}

	isDead() {
		return this._isDead;
	}

	addDeath() {
		this._deaths += 1;
	}

	addKill() {
		this._kills += 1;
	}
}