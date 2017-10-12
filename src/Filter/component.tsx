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

export function FilterComponent(props: FilterComponentProps) {
    return (
        <section className="filter">
            <FilterItem
                title="地区"
                type="region"
                options={props.displayRegions}
                handleSelect={props.handleSelect}
                extraOption=">>其他地区"
                handleExtra={props.handleExtra}
                selectedCode={props.filter.regionCode}
            />
            <FilterItem
                title="费用"
                type="cost"
                options={props.costOptions}
                handleSelect={props.handleSelect}
                selectedCode={props.filter.costCode}
            />
            <FilterItem
                title="身份"
                type="identity"
                options={props.identities}
                handleSelect={props.handleSelect}
                selectedCode={props.filter.identityCode}
            />
            <FilterItem
                title="性别"
                type="gender"
                options={props.genders}
                handleSelect={props.handleSelect}
                selectedCode={props.filter.genderCode}
            />
        </section>
    );
}
