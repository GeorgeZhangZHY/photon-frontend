import * as React from 'react';
import { Post, RouteProps } from '../../global/models';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { MultiPicker } from '../MultiPicker/MultiPicker';
import RegionSelect from '../RegionSelect/RegionSelect';
import { ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';

export type StateProps = {
    post: Post,
    allCostOptions: string[],
    allTags: string[],
};

export type OwnProps = {
    onSubmit: (post: Post) => Promise<any>,
    title: '发布约拍信息' | '修改约拍信息'
};

type PostEditComponentProps = StateProps & OwnProps & RouteProps;

class PostEdit extends React.Component<PostEditComponentProps, {
    requiredRegionCode: number,
    photoUrls: string[],
    costOption: string
    cost: number,
    content: string,
    tags: string[]
}> {

    constructor(props: PostEditComponentProps, context?: any) {
        super(props, context);
        const { photoUrls, requiredRegionCode, costOption, cost, content, tags } = props.post;
        this.state = {
            requiredRegionCode,
            photoUrls: [...photoUrls], // 避免改变props，使用浅拷贝
            costOption,
            cost,
            content,
            tags
        };
    }

    handleRegionChange = (newRegionCode: number) => {
        this.setState({ requiredRegionCode: newRegionCode });
    }

    handleCostOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ costOption: event.target.value });
    }

    handleCostChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ cost: event.target.valueAsNumber });
    }

    handleImageUrlsChange = (imageUrls: string[]) => {
        this.setState({ photoUrls: imageUrls });
    }

    handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ content: event.target.value });
    }

    handleTagChange = (tags: string[]) => {
        this.setState({ tags });
    }

    handleSubmit = () => {
        let result = { ...this.props.post, ...this.state };
        const { onSubmit, history } = this.props;
        onSubmit(result as Post).then(() => history!.goBack());
    }

    handleCancel = () => {
        this.props.history!.goBack();
    }

    render() {
        const { allCostOptions, allTags, title } = this.props;
        const { requiredRegionCode, photoUrls, cost, costOption, content, tags } = this.state;

        const shouldInputCost = !!(['需要收费', '愿意付费'].find(value => value === costOption));

        return (
            <section>
                <header>{title}</header>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label data-required>面向地区：</label>
                        <RegionSelect
                            initialRegionCode={requiredRegionCode}
                            onRegionCodeChange={this.handleRegionChange}
                        />
                    </div>
                    <div>
                        <label data-required>约拍费用：</label>
                        {allCostOptions.map(option =>
                            <label key={option}>
                                <input
                                    type="radio"
                                    name="costOption"
                                    defaultChecked={option === costOption}
                                    onChange={this.handleCostOptionChange}
                                    required
                                />
                                {option}
                            </label>)}
                        {shouldInputCost ?
                            <input
                                type="number"
                                name="cost"
                                placeholder="输入金额"
                                value={cost}
                                min={1}
                                onChange={this.handleCostChange}
                                required
                            />
                            : null}
                    </div>
                    <div>
                        <label data-required>发布内容：</label>
                        <textarea
                            name="content"
                            maxLength={100}
                            placeholder="自我介绍，对应征者的要求等（勿留联系方式，发布后，有人应征即可看到对方的联系方式）"
                            onChange={this.handleContentChange}
                            required
                        >{content}
                        </textarea>
                    </div>
                    <MultiPicker
                        allItems={allTags}
                        onChange={this.handleTagChange}
                        selectedItems={tags}
                        title="拍摄标签"
                    />
                    <div>
                        <label>附加照片：</label>
                        <span>您的个人照片或作品，最多9张</span>
                        <ImageUploader
                            initialImageUrls={photoUrls}
                            onImageUrlsChange={this.handleImageUrlsChange}
                        />
                    </div>
                    <input type="submit" value="提交" />
                    <input type="button" value="取消" onClick={this.handleCancel} />
                </form>
            </section >
        );
    }
}

export const PostEditComponent = withRouter(PostEdit);