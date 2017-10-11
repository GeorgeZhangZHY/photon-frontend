import * as React from 'react';
import { Option, Store } from '../mainReducer';

type FilterItemProps = {
    title: string,
    options: Option[],
    handleSelect: (filter: Store['filter']) => void,
    extraOption?: string,
    handleExtra?: () => void
};

const FilterItem = ({ title, options, handleSelect, extraOption, handleExtra }: FilterItemProps) => (
    <div>
        <span>{title}：</span>
        <ul>
            {options.map(option =>
                <li key={option.code} onClick={/* todo */}>{option.name}</li>)}
            {extraOption ?
                <li key="extra" onClick={handleExtra}>{extraOption}</li>
                : null}
        </ul>
    </div>
);

export default function FilterComponent(props: {
    displayRegions: Option[],
    costOptions: Option[],
    identities: Option[],
    genders: Option[],
    filter: Store['filter'],
    handleSelect: FilterItemProps['handleSelect'],
    handleExtra: FilterItemProps['handleExtra']
}) {
    return (
        <section>
            <FilterItem
                title="地区"
                options={props.displayRegions}
                handleSelect={props.handleSelect}
                extraOption=">>其他地区"
                handleExtra={props.handleExtra}
            />
            <FilterItem title="费用" options={props.costOptions} handleSelect={props.handleSelect} />
            <FilterItem title="身份" options={props.identities} handleSelect={props.handleSelect} />
            <FilterItem title="性别" options={props.genders} handleSelect={props.handleSelect} />
        </section>
    );
}
