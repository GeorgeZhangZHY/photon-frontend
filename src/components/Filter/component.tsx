import * as React from 'react';
import { Store } from '../../global/mainReducer';
import { Region } from '../../global/models';
import './Filter.css';

type Props = StateProps & DispatchProps;

export type StateProps = {
    displayRegions: Region[],
    costOptions: string[],
    identities: string[],
    genders: string[],
    filter: Store['filter'],
};

export type DispatchProps = {
    handleSelect: FilterItemProps['handleSelect'],
};

export class FilterComponent extends React.Component<Props> {

    render() {
        return (
            <section className="filter">
                <FilterItem
                    title="地区"
                    type="regionCode"
                    options={this.props.displayRegions}
                    handleSelect={this.props.handleSelect}
                    selectedValue={this.props.filter.regionCode}
                />
                <FilterItem
                    title="费用"
                    type="costOption"
                    options={this.props.costOptions}
                    handleSelect={this.props.handleSelect}
                    selectedValue={this.props.filter.costOption}
                />
                <FilterItem
                    title="身份"
                    type="identity"
                    options={this.props.identities}
                    handleSelect={this.props.handleSelect}
                    selectedValue={this.props.filter.identity}
                />
                <FilterItem
                    title="性别"
                    type="gender"
                    options={this.props.genders}
                    handleSelect={this.props.handleSelect}
                    selectedValue={this.props.filter.gender}
                />
            </section>
        );
    }
}

type FilterItemProps = {
    type: 'regionCode' | 'costOption' | 'identity' | 'gender',
    title: string,
    options: string[] | Region[],
    selectedValue: number | string,         // 选中区域时对应的是number
    handleSelect: (newValue: Partial<Store['filter']>) => void,
};

const FilterItem = (
    { type, title, options, selectedValue, handleSelect }: FilterItemProps
) => {

    let listItems = type === 'regionCode' ?
        (options as Region[]).map(region => (
            <li
                key={region.regionCode}
                className={region.regionCode === selectedValue ? 'selected' : ''}
                onClick={() => {
                    handleSelect({ regionCode: region.regionCode });
                }}
            >{region.regionName}
            </li>)) :
        (options as string[]).map(option => (
            <li
                key={option}
                className={option === selectedValue ? 'selected' : ''}
                onClick={() => {
                    handleSelect({ [type]: option });
                }}
            >{option}
            </li>));

    return (
        <div className="filter-item">
            <span>{title}：</span>
            <ul>
                {listItems}
            </ul>
        </div>
    );
};
