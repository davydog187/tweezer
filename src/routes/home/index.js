import { h, Component } from 'preact';
import style from './style';
import Track from "../../components/track";

export default class Home extends Component {

    state = {
        progress: 0
    }

    start = () => {
        this.setState({ progress: 0 });

        this.id = setInterval(() => {
            this.setState({ progress: ++this.state.progress });

            if (this.state.progress >= 100) {
                this.stop();
            }
        }, 16);
    }

    stop = () => {
        clearTimeout(this.id);
    }

    render() {
        const { progress } = this.state;

        const numTracks = 5;

        const tracks = Array.from(Array(numTracks).keys()).map(() => <Track progress={progress} />);

        return (
            <div class={style.home}>
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
                {tracks}
            </div>
        );
    }
}
