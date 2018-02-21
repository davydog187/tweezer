import { h, Component } from 'preact';
import style from './style';
import Track from "../../components/track";

export default class Home extends Component {

    state = {
        progress: 0
    }

    componentDidMount() {
        this.id = setInterval(() => this.setState({ progress: ++this.state.progress }), 16);
    }

    componentWillUnmount() {
        clearTimeout(this.id);
    }

    render() {
        const { progress } = this.state;

        return (
            <div class={style.home}>
                <Track progress={progress} />
            </div>
        );
    }
}
