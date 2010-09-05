/*
---
script: Number3D.js
license: MIT-style license.
description: The Number3D class represents a value in a three-dimensional coordinate system.
copyright: Copyright (c) 2010, Dipl.-Ing. (FH) André Fiedler <kontakt at visualdrugs dot net>, based on code by Papervision3D.org
authors: [André Fiedler]

requires: 
  core/1.2.3: []‚

provides: [Number3D]
...
*/


var Number3D = new Class({
    
    x: 0, // The horizontal coordinate value.
    y: 0, // The vertical coordinate value.
    z: 0, // The depth coordinate value.
    
    toDEGREES: 180 / Math.PI,
    toRADIANS: Math.PI / 180,
    
    /**
    * Creates a new Number3D object whose three-dimensional values are specified by the x, y and z parameters. If you call this constructor function without parameters, a Number3D with x, y and z properties set to zero is created.
    *
    * @param    x   The horizontal coordinate value. The default value is zero.
    * @param    y   The vertical coordinate value. The default value is zero.
    * @param    z   The depth coordinate value. The default value is zero.
    */
    initialize: function(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    },

    /**
    * Returns a new Number3D object that is a clone of the original instance with the same three-dimensional values.
    *
    * @return   A new Number3D instance with the same three-dimensional values as the original Number3D instance.
    */
    clone: function() {
        return new Number3D(this.x, this.y, this.z);
    },

    /**
     * Copies the values of this Number3d to the passed Number3d.
     */
    copyTo: function(n) {
        n.x = this.x;
        n.y = this.y;
        n.z = this.z;
    },
    
    /**
     * Copies the values of this Number3d to the passed Number3d.
     */
    copyFrom: function(n) {
        this.x = n.x;
        this.y = n.y;
        this.z = n.z;
    },

    /**
     * Quick way to set the properties of the Number3D
     */
    reset: function(newx, newy, newz) {
        this.x = newx || 0;
        this.y = newy || 0;
        this.z = newz || 0;
    },

    /**
    * Modulo
    */
    modulo: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },

    /**
     * Normalize.
     */
    normalize: function() {
        var mod = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

        if(mod != 0 && mod != 1) {
            mod = 1 / mod; // mults are cheaper then divs
            this.x *= mod;
            this.y *= mod;
            this.z *= mod;
        }
    },
    
    /**
     * Multiplies the vector by a number. The same as the *= operator
     */
    multiplyEq: function(n)
    {
        this.x *= n;
        this.y *= n;
        this.z *= n;
    },

    /**
     * Adds the vector passed to this vector. The same as the += operator.
     */
    plusEq: function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    },

    /**
     * Subtracts the vector passed to this vector. The same as the -= operator.
     */
    minusEq: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    },

    /**
     * Super fast modulo(length, magnitude) comparisons.
     */
    isModuloLessThan: function(n) {
        return this.moduloSquared() < ( n * n );
    },

    isModuloGreaterThan: function(n) {
        return this.moduloSquared() > ( n * n );
    },
    
    isModuloEqualTo: function(n) {
        return this.moduloSquared() == ( n * n );
    },

    moduloSquared: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    
    /**
    * @param    angle   The angle in degrees.
    */
    rotateX: function(angle) {
        angle *= this.toRADIANS;

        var cosRY = Math.cos(angle);
        var sinRY = Math.sin(angle);

        var tempY = this.x;
        var tempZ = this.z;

        this.y = (tempY * cosRY) - (tempZ * sinRY);
        this.z = (tempY * sinRY) + (tempZ * cosRY);
    },

    /**
    * @param    angle   The angle in degrees.
    */
    rotateY: function(angle) {
        angle *= this.toRADIANS;

        var cosRY = Math.cos(angle);
        var sinRY = Math.sin(angle);

        var tempX = this.x;
        var tempZ = this.z;

        this.x = (tempX * cosRY) + (tempZ * sinRY);
        this.z = (tempX *- sinRY) + (tempZ * cosRY);
    },
    
    /**
    * @param    angle   The angle in degrees.
    */
    rotateZ: function(angle) {
        angle *= this.toRADIANS;

        var cosRY = Math.cos(angle);
        var sinRY = Math.sin(angle);

        var tempX = this.x;
        var tempY = this.y;
        
        this.x = (tempX * cosRY) - (tempY * sinRY);
        this.y = (tempX * sinRY) + (tempY * cosRY);
    }
});

/**
* Returns a string value representing the three-dimensional values in the specified Number3D object.
*
* @return   A string.
*/
Number3D.prototype.toString = function() {
    return 'x:' + (Math.round(this.x * 100) / 100) + ' y:' + (Math.round(this.y * 100) / 100) + ' z:' + (Math.round(this.z * 100) / 100);
};

Number3D.extend({
    
    /**
    * Add
    */
    add: function(v, w) {
        return new Number3D(
            v.x + w.x,
            v.y + w.y,
            v.z + w.z
        );
    },

    /**
     * Subtract.
     */
    sub: function(v, w) {
        return new Number3D(
            v.x - w.x,
            v.y - w.y,
            v.z - w.z
        );
    },

    /**
     * Dot product.
     */
    dot: function(v, w) {
        return v.x * w.x + v.y * w.y + w.z * v.z;
    },

    /**
     * Cross product.
     */
    cross: function(v, w) {
        return new Number3D(
            (w.y * v.z) - (w.z * v.y),
            (w.z * v.x) - (w.x * v.z),
            (w.x * v.y) - (w.y * v.x)
        );
    }
});
