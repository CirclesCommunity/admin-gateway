import { IntersectionType } from '@nestjs/graphql'

const getIntersection = (...classes) => {
  return classes.length == 1
    ? classes[0]
    : IntersectionType(classes[0], getIntersection(...classes.slice(1)))
}

export default getIntersection