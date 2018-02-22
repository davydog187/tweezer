import { h, Component } from 'preact';
import style from './style';
import Track from "../../components/track";

import Tweezer from "../../../lib/Tweezer";

const EXAMPLES = [
    { name: "linear", easer: val => val },
    { name: "out-quart", easer: t => 1-(--t)*t*t*t },
    { name: "in-out-cubic", easer: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
];

export default class Home extends Component {

    state = {
        progress: 0
    }

    start = () => {
        this.setState({ progress: 0 });

        this.tweezer = new Tweezer({
            duration: 1000
        });

        this.tweezer.onTick(percent => this.setState({ progress: percent }));
        this.tweezer.onFinished(() => console.info("finished!"));

        this.tweezer.start();
    }

    stop = () => {
        this.tweezer.stop();
    }

    render() {
        const { progress } = this.state;

        const numTracks = 5;

        const tracks = EXAMPLES.map(({ name, easer }) => <Track name={name} progress={easer(progress) * 100} />);

        return (
            <div class={style.home}>
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
                {tracks}
            </div>
        );
    }
}
