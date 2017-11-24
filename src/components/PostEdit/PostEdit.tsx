import * as React from 'react';
import { Post, Region } from '../../global/models';
import { ImageUploader } from '../ImageUploader/ImageUploader';

type PostEditComponentProps = {
    post: Post,
    costOptions: string[],
    regions: Region[],  // 所有地区
    provinces: Region[],
    tags: string[],
    submit: (post: Post) => void,
    title: '发表约拍信息' | '修改约拍信息'
};

export class PostEditComponent extends React.Component<PostEditComponentProps, {
    selectedProvince: Region | null,
    photoUrls: string[]
}> {

    form: HTMLFormElement;

    constructor(props: PostEditComponentProps) {
        super(props);
        this.state = {
            selectedProvince: null,
            photoUrls: props.post.photoUrls.slice() // 避免改变props，使用浅拷贝
        };
    }

    handleSubmit = () => {
        const
    }

    handleImageUrlsChange = (imageUrls: string[]) => {
        this.setState({ photoUrls: imageUrls });
    }

    render() {
        const { costOptions, post, regions, tags, title, provinces } = this.props;
        const { selectedProvince, photoUrls } = this.state;

        let subRegions;
        if (selectedProvince) {
            const provincePrefix = selectedProvince.regionCode.toString().substring(0, 2);
            subRegions = regions.filter(region => region.regionCode.toString().search(provincePrefix) === 0); // 前两位编码相同
        }

        return (
            <section>
                <title>{title}</title>
                <form ref={f => this.form = f!} onSubmit={this.handleSubmit}>
                    <div>
                        <label data-required>面向地区：</label>
                        <select name="province" required>
                            <option value="" disabled selected hidden>省份</option>
                            {provinces.map(province =>
                                <option
                                    key={province.regionCode}
                                    value={province.regionCode}
                                >{province.regionName}
                                </option>)}
                        </select>
                        <select name="region" required>
                            <option value="" disabled selected hidden>地区</option>
                            {subRegions && subRegions.map(region =>
                                <option
                                    key={region.regionCode}
                                    value={region.regionCode}
                                >{region.regionName}
                                </option>)}
                        </select>
                    </div>
                    <div>
                        <label data-required>约拍费用：</label>
                        {costOptions.map(option =>
                            <label key={option}><input type="radio" name="costOption" />{option}</label>)}
                    </div>
                    <div>
                        <label data-required>发布内容：</label>
                        <textarea
                            name="content"
                            maxLength={100}
                            placeholder="自我介绍，对应征者的要求等（勿留联系方式，发布后，有人应征即可看到对方的联系方式）"
                        />
                    </div>
                    <div>
                        <label>拍摄标签：</label>
                        {tags.map(tag => <span key={tag}>{tag}</span>)}
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
                    <input type="button" value="取消" />
                </form>
            </section>
        );
    }
}