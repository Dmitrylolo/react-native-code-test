import React, { Component } from 'react';
import {
    View,
    Animated,
} from 'react-native';


class Loading extends Component {

    state = {
        animated: new Animated.Value(0.2),
        opacity: new Animated.Value(0.4),
        animated2: new Animated.Value(0.2),
        opacity2: new Animated.Value(0.4),
        itemsToAnimate: 0
    }

    componentDidMount() {
        const { animated, opacity, animated2, opacity2 } = this.state;

        Animated.stagger(3000, [
            Animated.loop(
                Animated.parallel([
                    Animated.timing(animated, {
                        toValue: 1,
                        duration: 3000
                    }),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 3000
                    })
                ])
            ),
            Animated.loop(
                Animated.parallel([
                    Animated.timing(animated2, {
                        toValue: 1,
                        duration: 1500
                    }),
                    Animated.timing(opacity2, {
                        toValue: 0,
                        duration: 1500
                    })
                ])
            )
        ]).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={[
                        {
                            borderRadius: 50
                        }, {
                            backgroundColor: 'rgb(119, 193, 12)',
                            opacity: this.state.opacity,
                            transform: [
                                {
                                    scale: this.state.animated
                                }
                            ]
                        }]}
                />
                <Animated.View
                    style={[
                        styles.animatedCircle,
                        {
                            marginTop: -100
                        }, {
                            backgroundColor: 'rgb(119, 193, 12)',
                            opacity: this.state.opacity2,
                            transform: [
                                {
                                    scale: this.state.animated2
                                }
                            ]
                        }]}
                />
                <View style={styles.circleContainer}>
                    <View
                        style={styles.circle}
                    />
                </View>
            </View>
        );
    }
}

export default Loading;

const styles = {
    contaier: {
    },
    animatedCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    circleContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -100,
        backgroundColor: 'transparent'
    },
    circle:
        {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: 'rgb(119, 193, 12)'
        }

};
