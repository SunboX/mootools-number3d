Number3D
=========

The smallest part of an 3D engine. ;o)


![Screenshot](http://github.com/SunboX/mootools-number3d/raw/master/screen.png)


How to use
----------


	window.addEvent('domready', function(){
		
        var n1 = new Number3D(2, 2, 2);
        var n2 = new Number3D(5, 5, 5);
        
        var n3 = Number3D.add(n1, n2);
        
        n1.rotateZ(90);
        
        n1.normalize();
	
	});



License
----------

See [license](http://github.com/SunboX/mootools-number3d/blob/master/license) file.