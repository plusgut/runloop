;(function(runloop) {
	////-----------------------------------------------------------------------------------------
	// Active jobs-array
	runloop.jobs = [];
	////-----------------------------------------------------------------------------------------
	// How many miliseconds should triggering the jobs
	runloop.interval = 10;
	////-----------------------------------------------------------------------------------------
	// What tick we are currently in
	runloop.tick = 0;
	////-----------------------------------------------------------------------------------------
	// Calls runloop jobs
	// @TODO call not every controller on each tick but depending on there interval
	// @TODO remove job when not needed
	runloop.loop = function(){
		for( var i = 0; i < this.jobs.length; i++ ){
			this.jobs[ i ].callback(this.tick);
		}

		this.tick++;
		if( !this.stopped ){
			setTimeout( this.loop.bind( this ), this.interval );
		}
	};
	////-----------------------------------------------------------------------------------------
	// add a job to the list
	// @TODO validation
	runloop.addJob = function( job ){
		// @FIXME dont take just the callbacks, but the scope
		return this.jobs.push( job );
	};
	////-----------------------------------------------------------------------------------------
	// Stops the runloop
	runloop.stop = function() {
		this.stopped = true;
	};
	////-----------------------------------------------------------------------------------------
	// Starts the loop
	runloop.start = function() {
		this.stopped = false;
		this.loop();
	};
	runloop.start();
}(typeof module == 'object' ? module.exports : window.runloop = {}));
