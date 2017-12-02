import * as React from 'react';
import { Post, Region } from '../../global/models';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { ChangeEvent } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { AxiosPromise } from 'axios';

export type StateProps = {
    post: Post,
    allCostOptions: string[],
    allRegions: Region[],  // 所有地区
    allTags: string[],
    provinces: Region[]
};

type RouterProps = {
    history?: History;
};

export type OwnProps = {
    submit: (post: Post) => AxiosPromise,
    title: '发布约拍信息' | '修改约拍信息'
};

type PostEditComponentProps = StateProps & OwnProps & RouterProps;

class PostEdit extends React.Component<PostEditComponentProps, {
    requiredRegionCode: number,
    selectedProvinceCode: number,
    photoUrls: string[],
    costOption: string
    cost: number,
    content: string,
    tags: string[]
}> {

    form: HTMLFormElement;

    constructor(props: PostEditComponentProps) {
        super(props);
        const { photoUrls, requiredRegionCode, costOption, cost, content, tags } = props.post;
        this.state = {
            requiredRegionCode,
            selectedProvinceCode: Math.floor(requiredRegionCode / 10000) * 10000,   // 对应省级单位的代码
            photoUrls: [...photoUrls], // 避免改变props，使用浅拷贝
            costOption,
            cost,
            content,
            tags
        };
    }

    handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            selectedProvinceCode: +event.target.selectedOptions[0].value
        });
    }

    handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            requiredRegionCode: +event.target.selectedOptions[0].value
        });
    }

    handleCostOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            costOption: event.target.value
        });
    }

    handleCostChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            cost: event.target.valueAsNumber
        });
    }

    handleImageUrlsChange = (imageUrls: string[]) => {
        this.setState({
            photoUrls: imageUrls
        });
    }

    handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            content: event.target.value
        });
    }

    toggleTag = (tag: string) => {
        this.setState(prevState => {
            let selectedTags: string[] = [...prevState.tags];
            let index = selectedTags.findIndex(selectedTag => selectedTag === tag);
            if (index === -1) {
                // 之前没有选中，将其选中
                selectedTags.push(tag);
            } else {
                // 已选中的，取消选中
                selectedTags.splice(index, 1);
            }
            return { selectedTags };
        });
    }

    handleSubmit = () => {
        let result = { ...this.props.post, ...this.state };
        delete result.selectedProvinceCode;

        const { submit, history } = this.props;
        submit(result as Post).then(() => history!.goBack());
    }

    handleCancel = () => {
        this.props.history!.goBack();
    }

    render() {
        const { allCostOptions, allRegions, allTags, title, provinces } = this.props;
        const { themeName } = this.props.post;
        const { requiredRegionCode, photoUrls, selectedProvinceCode,
            cost, costOption, content, tags } = this.state;

        const provinceCodeStr = selectedProvinceCode.toString().substring(0, 2);
        const subRegions = allRegions.filter(
            region => region.regionCode.toString().search(provinceCodeStr) === 0
        ); // 前两位编码相同

        const shouldInputCost = !!(['需要收费', '愿意付费'].find(value => value === costOption));

        return (
            <section>
                <header>{themeName ? themeName + ' - ' + title : title}</header>
                <form ref={f => this.form = f!} onSubmit={this.handleSubmit}>
                    <div>
                        <label data-required>面向地区：</label>
                        <select name="province" required onChange={this.handleProvinceChange}>
                            <option value="" disabled selected={!selectedProvinceCode} hidden>省份</option>
                            {provinces.map(province =>
                                <option
                                    key={province.regionCode}
                                    value={province.regionCode}
                                    selected={province.regionCode === selectedProvinceCode}
                                >{province.regionName}
                                </option>)}
                        </select>
                        <select name="region" required onChange={this.handleRegionChange}>
                            <option value="" disabled selected={!requiredRegionCode} hidden>地区</option>
                            {subRegions && subRegions.map(region =>
                                <option
                                    key={region.regionCode}
                                    value={region.regionCode}
                                    selected={region.regionCode === requiredRegionCode}
                                >{region.regionName}
                                </option>)}
                        </select>
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
                            />
                            : null}
                    </div>
                    <div>
                        <label data-required>发布内容：</label>
                        <textarea
                            name="content"
                            maxLength={100}
                            placeholder="自我介绍，对应征者的要求等（勿留联系方式，发布后，有人应征即可看到对方的联系方式）"
                            value={content}
                            onChange={this.handleContentChange}
                        />
                    </div>
                    <div>
                        <label>拍摄标签：</label>
                        {allTags.map(tag =>
                            <span
                                key={tag}
                                onClick={() => this.toggleTag(tag)}
                                className={tags.find(selectedTag => selectedTag === tag) ? 'selected' : ''}
                            >{tag}
                            </span>)}
                    </div>
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
            </section>
        );
    }
}

export const PostEditComponent = withRouter(PostEdit);