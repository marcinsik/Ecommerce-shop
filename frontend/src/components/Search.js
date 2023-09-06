import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/search?keyword=${keyword}&page=1`);
        } else {
            navigate(navigate());
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='search-box'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='search-btn'
            >
                Submit
            </Button>
        </Form>
    )
}

export default Search