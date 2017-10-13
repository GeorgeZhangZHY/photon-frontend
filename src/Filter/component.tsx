import * as React from 'react';
import { Option, Store } from '../mainReducer';
import './Filter.css';

type FilterItemProps = {
    title: string,
    type: string,
    options: Option[],
    selectedCode: number,
    handleSelect: (newValue: Partial<Store['filter']>) => void,
    extraOption?: string,
    handleExtra?: () => void
};

const FilterItem = (
    { title, type, options, selectedCode, handleSelect, extraOption, handleExtra }: FilterItemProps
) => (
        <div className="filter-item">
            <span>{title}：</span>
            <ul>
                {options.map(option =>
                    <li
                        key={option.code}
                        className={option.code === selectedCode ? 'selected' : ''}
                        onClick={() => {
                            handleSelect({ [type + 'code']: option.code });
                        }}
                    >{option.name}
                    </li>)}
                {extraOption ?
                    <li key="extra" onClick={handleExtra}>{extraOption}</li>
                    : null}
            </ul>
        </div>
    );

export type FilterComponentProps = {
    displayRegions: Option[],
    costOptions: Option[],
    identities: Option[],
    genders: Option[],
    filter: Store['filter'],
    handleSelect: FilterItemProps['handleSelect'],
    handleExtra: FilterItemProps['handleExtra']
};

export class FilterComponent extends React.Component<FilterComponentProps> {

    render() {
        return (
            <section className="filter">
                <FilterItem
                    title="地区"
                    type="region"
                    options={this.props.displayRegions}
                    handleSelect={this.props.handleSelect}
                    extraOption=">>其他地区"
                    handleExtra={this.props.handleExtra}
                    selectedCode={this.props.filter.regionCode}
                />
                {/* <FilterItem
                    title="费用"
                    type="cost"
                    options={this.props.costOptions}
                    handleSelect={this.props.handleSelect}
                    selectedCode={this.props.filter.costCode}
                />
                <FilterItem
                    title="身份"
                    type="identity"
                    options={this.props.identities}
                    handleSelect={this.props.handleSelect}
                    selectedCode={this.props.filter.identityCode}
                />
                <FilterItem
                    title="性别"
                    type="gender"
                    options={this.props.genders}
                    handleSelect={this.props.handleSelect}
                    selectedCode={this.props.filter.genderCode}
                /> */}
            </section>
        );
    }
}
