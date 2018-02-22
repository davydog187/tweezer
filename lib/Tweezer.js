const linear = val => val;
const time = () => performance.now();
const isNum = thing => typeof thing === "number";
const noop = () => null;

export default class Tweezer {

    constructor(options = {}) {
        const {
            duration = 1000,
            easer = linear,
        } = options;

        console.info(options);

        if (!isNum(duration) || duration <= 0) {
            throw "Duration much be a positive number";
        }

        this.__duration = duration;
        this.__easer = easer;
        this.__onTick = noop;
        this.__onFinished = noop;

        this.__startTime = null;
        this.__delta = null;
        this.__id = null;
    }

    onTick(func) {
        this.__onTick = func;
    }

    onFinished(func) {
        this.__onFinished = func;
    }

    /**
     * Starts the loop from the beginning
     *
     * @method
     */
    start() {
        this.__startTime = time();
        this.__delta = 0;
        this.__elapsed = 0;

        this.loop();
    }

    /**
     * Resumes the loop from where it left off, otherwise
     * it starts from the beginning
     * @method
     */
    resume() {
        if (!this.__startTime) {
            return this.start();
        }

        this.loop();
    }

    /**
     * Stops the loop
     * @method
     */
    stop() {
        cancelAnimationFrame(this.__id);
    }

    /**
     * @private
     * @method
     */
    loop() {
        this.__id = requestAnimationFrame(() => {
            const prevTime = (this.__elapsed + this.__startTime);

            this.__delta = time() - prevTime;
            this.__elapsed = this.__elapsed + this.__delta;

            const percent = this.__elapsed / this.__duration;

            this.__onTick(this.__easer(percent), this.__delta, this.__elapsed);

            if (this.__elapsed < this.__duration) {
                this.loop();
            } else {
                this.__onFinished();
            }
        });
    }

}
