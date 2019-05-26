import React, { FC } from 'react'
import useRouter from 'use-react-router'
import { FiscalOverviewRouteProps } from 'src/routes/types'

const FiscalOverview: FC<{}> = () => {
  const {
    match: {
      params: { year }
    }
  } = useRouter<FiscalOverviewRouteProps>()
  return <div>{year}</div>
}

export default FiscalOverview
