import React, { useEffect, useState } from "react";
import { Select } from 'antd';
import { getTags } from "../../../../modules/post/service/postService";
import { SelectProps } from "antd/lib";
import CreateNewTag from "./add";

interface Props {
    setTags: Function
}

const AddTag: React.FC<Props> = ({ setTags }) => {
    const [options, setOptions] = useState<SelectProps['options']>([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        getTags().then((res) => {
            setOptions(res.data.map((vl: any) => ({
                value: vl.name,
                label: vl.name
            })));
        });
    }, [change]);

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
        setTags(value);
    };

    return (
        <div>
            <Select
                className="py-2"
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                onChange={handleChange}
                options={options}
            />
            <CreateNewTag setChange={setChange} change={change} />
        </div>
    );
};

export default AddTag;
