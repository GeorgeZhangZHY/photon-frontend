import * as React from 'react';
import { Region, } from '../../global/models';
import { ChangeEvent } from 'react';

export type StateProps = {
    allRegions: Region[]  // 所有地区
    provinces: Region[]
};

export type OwnProps = {
    initialRegionCode?: number,
    onRegionCodeChange: (newRegionCode: number) => void
};

type Props = StateProps & OwnProps;

type State = {
    selectedProvinceCode: number,
    selectedRegionCode: number
};

export class RegionSelectComponent extends React.Component<Props, State> {

    constructor(props: Props, context?: any) {
        super(props, context);
        const selectedRegionCode = props.initialRegionCode || 0;
        this.state = {
            selectedRegionCode,
            selectedProvinceCode: Math.floor(selectedRegionCode / 10000) * 10000
        };
    }

    handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            selectedProvinceCode: +event.target.selectedOptions[0].value
        });
    }

    handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newRegionCode = +event.target.selectedOptions[0].value;
        this.setState({
            selectedRegionCode: newRegionCode
        });
        this.props.onRegionCodeChange(newRegionCode);
    }

    render() {
        const { allRegions, provinces } = this.props;
        const { selectedProvinceCode, selectedRegionCode } = this.state;

        const provinceCodeStr = selectedProvinceCode.toString().substring(0, 2);
        const subRegions = allRegions.filter(
            region => region.regionCode.toString().search(provinceCodeStr) === 0
        ); // 前两位编码相同

        return (
            <div>
                <select
                    name="province"
                    required
                    onChange={this.handleProvinceChange}
                    value={selectedProvinceCode}
                >
                    <option value={0} disabled hidden>省份</option>
                    {provinces.map(province =>
                        <option
                            key={province.regionCode}
                            value={province.regionCode}
                        >{province.regionName}
                        </option>)}
                </select>
                <select
                    name="region"
                    required
                    onChange={this.handleRegionChange}
                    value={selectedRegionCode}
                >
                    <option value={0} disabled hidden>地区</option>
                    {subRegions && subRegions.map(region =>
                        <option
                            key={region.regionCode}
                            value={region.regionCode}
                        >{region.regionName}
                        </option>)}
                </select>
            </div>
        );
    }
}