import React, { useState } from 'react';
import { Table, Button } from 'antd';

const Specifications = (props) => {

    const initialTableSize = 8;
    const [expandedTable, setExpandedTable] = useState(false);
    const [tableSize, setTableSize] = useState(initialTableSize);
      
    const handleReadMore = () => {
        setTableSize(data.length);
        setExpandedTable(true);
    }; 
    
    const handleCollapse = () => {
        setTableSize(initialTableSize);
        setExpandedTable(false);
    }

    const columns = [
        {
        //   title: 'name',
          dataIndex: 'name',
          render: (text) => <strong>{text}</strong>,
        },
        {
        //   title: 'info',
          className: 'info',
          dataIndex: 'info',
          render: (text) => <pre style={{whiteSpace: 'pre-wrap'}}>{text}</pre>,

        //   align: 'right',
        }
    ]

    const data = [];
    const description = props.data
    var i = 1
    for (let key in description) {
        if (description.hasOwnProperty(key)) {
            const value = description[key];
            data.push({
                key: `${i}`,
                name: `${key}`,
                info: value,
            })
            i++
        }
    }

    return (
        <>
        <h2>Thông tin sản phẩm</h2>
        <div className="specifications-container">
            <Table
                columns={columns}
                dataSource={data.slice(0, tableSize)}
                bordered
                pagination={false}
                title={() => <strong>THÔNG SỐ KỸ THUẬT</strong>}
            />  
            <div style={{ textAlign: 'center', marginTop: 16 }}>
            {
                (expandedTable) ? (
                    <Button danger onClick={handleCollapse}><strong>Thu gọn</strong></Button>
                ) : (
                    <Button danger onClick={handleReadMore}><strong>Đọc thêm</strong></Button>
                )
            }
            </div>
        </div>
        </>
    )
}

export default Specifications