import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ConfigProvider from '../config-provider';
import {obj} from '../util';
import Sup from './sup';

/**
 * Badge
 */
class Badge extends Component {
    static propTypes = {
        // 样式类名的品牌前缀
        prefix: PropTypes.string,
        // 自定义类名
        className: PropTypes.string,
        // 自定义内联样式
        style: PropTypes.object,
        /**
         * 徽章依托的内容
         */
        children: PropTypes.node,
        /**
         * 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏
         */
        count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * 自定义节点内容
         */
        content: PropTypes.node,
        /**
         * 展示的封顶的数字
         */
        overflowCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * 不展示数字，只展示一个小红点
         */
        dot: PropTypes.bool
    };

    static defaultProps = {
        prefix: 'next-',
        count: 0,
        overflowCount: 99,
        dot: false
    };

    render() {
        const {
            prefix, dot, className, children, content, style,
            count: originCount,
            overflowCount: originOverflowCount
        } = this.props;
        const count = parseInt(originCount, 10);
        const overflowCount = parseInt(originOverflowCount, 10);
        const others = obj.pickOthers(Badge.propTypes, this.props);

        // 如果是数字，则添加默认的 title
        if (count) {
            others.title = others.title || `${count}`;
        }

        const classes = classNames(`${prefix}badge`, {
            [`${prefix}badge-not-a-wrapper`]: !children,
        }, className);

        return (
            <span className={classes} {...others}>
                {children}
                <Sup {...({prefix, content, count, overflowCount, dot, style})} />
            </span>
        );
    }
}

export default ConfigProvider.config(Badge);
