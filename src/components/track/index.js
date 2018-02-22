import { h, Component } from "preact";
import style from "./style";

function clamp(progress) {
    if (progress > 100) return 100;
    if (progress < 0) return 0;

    return progress;
}

export default class Track extends Component {

    trackRef = el => this.track = el;

    computeDistance(progress) {

        if (!this.track) {
            return 0;
        }

        return (this.track.offsetWidth - 20) * (clamp(progress) / 100);
    }

    render() {
        const { name, progress } = this.props;

        const distance = this.computeDistance(progress);

        const styles = {
            transform: `translateX(${distance}px)`
        }

        return (
            <div>
                <label>{name}</label>
                <div class={style.track} ref={this.trackRef}>
                    <span style={styles} class={style.track__item}> </span>
                </div>
            </div>
        );

    }

}
