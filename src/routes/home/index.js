import { h, Component } from 'preact';
import style from './style';
import Track from "../../components/track";

import Tweezer from "../../../lib/Tweezer";
import * as EASERS from "../../../lib/Eezer";

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

        const tracks = Object.keys(EASERS).map(name => <Track name={name} progress={EASERS[name](progress) * 100} />);

        return (
            <div class={style.home}>
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
                {tracks}
            </div>
        );
    }
}
