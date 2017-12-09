import * as React from 'react';

type Props = {
    pageSize: number,
    symbol?: any, // 用于标识接受到的数据类型，在标识改变时恢复为初始状态
    initialPageNum?: number, // 用于初始化自己state中的pageNum
    loadData: (pageNum: number, pageSize: number) => Promise<any[]>,
    onDataLoaded: (newData: any[]) => void
};

type State = {
    currentPageNum: number,
    hasMorePage: boolean,
    isLoading: boolean,
    isThrottled: boolean
};

export default class InfiniteScroll extends React.Component<Props, State> {
    constructor(props: Props, context?: any) {
        super(props, context);
        this.state = {
            currentPageNum: props.initialPageNum || -1,
            hasMorePage: true,
            isLoading: false,
            isThrottled: false
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        const { symbol, initialPageNum } = this.props;
        if (nextProps.symbol !== symbol) {
            this.setState({
                currentPageNum: initialPageNum || -1,
                hasMorePage: true,
                isLoading: false,
                isThrottled: false
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onThrottledScroll);
        this.loadNextPage();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onThrottledScroll);
    }

    onThrottledScroll = () => {
        const { isThrottled } = this.state;
        if (!isThrottled) {
            setTimeout(() => {
                this.handleScroll();
                this.setState({ isThrottled: false });
                // tslint:disable-next-line:align
            }, 80);
        }
        this.setState({ isThrottled: true });
    }

    handleScroll = () => {
        const { hasMorePage, isLoading } = this.state;
        if ((!isLoading) && hasMorePage) {
            const innerHeight = window.innerHeight;
            const rect = document.body.getBoundingClientRect();
            const isBottom = rect.bottom - innerHeight <= 0;
            if (isBottom) {
                this.loadNextPage();
            }
        }
    }

    loadNextPage = () => {
        const { loadData, pageSize, onDataLoaded, symbol } = this.props;
        const { currentPageNum } = this.state;
        this.setState({ isLoading: true });
        loadData(currentPageNum + 1, pageSize).then(newData => {
            if (symbol !== this.props.symbol) {
                return;     // 加载完成之前更换条件，放弃无效数据
            }
            onDataLoaded(newData);
            this.setState({
                isLoading: false,
                currentPageNum: currentPageNum + 1,
                hasMorePage: newData.length > 0
            });
        }).catch(err => {
            this.setState({ isLoading: false });
        });
    }

    render() {
        return this.props.children;
    }
}