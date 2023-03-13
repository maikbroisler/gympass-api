import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsInsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsInsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsInsRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    await gymsInsRepository.create({
      title: 'Near Gym',
      description: null,
      latitude: -21.4586246,
      longitude: -49.9379908,
      phone: null,
    })

    await gymsInsRepository.create({
      title: 'Far Gym',
      description: null,
      latitude: -21.377112515272923,
      longitude: -50.207759321579694,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.4586246,
      userLongitude: -49.9379908,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
