import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile-dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProfilesService {
    private profiles = [
        { id: randomUUID(), name: 'John Doe', description: 'A sample profile' },
        { id: randomUUID(), name: 'Jane Smith', description: 'Another sample profile' },
        { id: randomUUID(), name: 'Alice Johnson', description: 'Yet another sample profile' },
    ];

    findAll() {
        return this.profiles;
    }

    findOne(id: string) {
        const profile = this.profiles.find(profile => profile.id === id);
        if(!profile) {
            throw new NotFoundException(`Profile with id ${id} not found`);
        }
        return profile;
    }

    create(createProfileDto: CreateProfileDto) {
        const newProfile = {
            id: randomUUID(),
            name: createProfileDto.name,
            description: createProfileDto.description,
        };
        this.profiles.push(newProfile);
        return newProfile;
    }

    update(id: string, updateProfileDto: Partial<CreateProfileDto>) {
        const profileIndex = this.profiles.findIndex(profile => profile.id === id);
        if (profileIndex === -1) {
            throw new NotFoundException(`Profile with id ${id} not found`);
        }
        const updatedProfile = {
            ...this.profiles[profileIndex],
            ...updateProfileDto,
        };
        this.profiles[profileIndex] = updatedProfile;
        return updatedProfile;
    }

    remove(id: string) {
        const profileIndex = this.profiles.findIndex(profile => profile.id === id);
        if (profileIndex === -1) {
            throw new NotFoundException(`Profile with id ${id} not found`);
        }
        this.profiles.splice(profileIndex, 1);
    }

}
