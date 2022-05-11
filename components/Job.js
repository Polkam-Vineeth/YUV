import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import {Card,Badge,Button,Collapse} from 'react-bootstrap'
export default function Job({ job }) {
  const [open, setOpen] = useState(false)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} - <span className="text-muted font-weight-light">{job.company.display_name}</span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created).toLocaleDateString('en-GB',options)}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">{job.description}</Badge>
            <Badge variant="secondary">{job.location.display_name}</Badge>
            <div style={{ wordBreak: 'break-all' }}>
              <ReactMarkdown source={job.redirect_url} />
            </div>
          </div>
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen(prevOpen => !prevOpen)}
            variant="primary"
          >
            {open ? 'Hide Details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <ReactMarkdown source={job.description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}