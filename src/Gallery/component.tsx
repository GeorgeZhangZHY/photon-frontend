import * as React from 'react';

export type GalleryComponentProps = {
    mainTitle: string,
    handleClick: (id: number) => void,
    requestData: () => void,
    items: {
        title: string,
        imageUrl: string,
        id: number
    }[]
};

export class GalleryComponent extends React.Component<GalleryComponentProps> {

    componentDidMount() {
        this.props.requestData();
    }

    render() {
        return (
            <section>
                <span>{this.props.mainTitle}</span>
                {this.props.items.map(item =>
                    <div key={item.id} onClick={() => this.props.handleClick(item.id)}>
                        <img src={item.imageUrl} alt={item.title} />
                        <span>{item.title}</span>
                    </div>)}
            </section>
        );
    }
}

export default GalleryComponent;