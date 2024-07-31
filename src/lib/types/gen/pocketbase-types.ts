/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	PageBlocks = "page_blocks",
	PollOptions = "poll_options",
	PollVotes = "poll_votes",
	Polls = "polls",
	Test = "test",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type PageBlocksRecord = {
	content?: HTMLString
	name?: string
}

export type PollOptionsRecord = {
	description?: HTMLString
	icon?: string
	image?: string
	title?: string
}

export type PollVotesRecord = {
	options?: RecordIdString[]
	user?: RecordIdString
}

export enum PollsTypeOptions {
	"FPTP_SINGLE" = "FPTP_SINGLE",
	"FPTP_MULTI" = "FPTP_MULTI",
	"STV" = "STV",
}
export type PollsRecord = {
	description?: HTMLString
	featured?: boolean
	image?: string
	image_dark?: string
	options?: RecordIdString[]
	private?: boolean
	show_votes?: boolean
	slug: string
	title: string
	type?: PollsTypeOptions
	votes?: RecordIdString[]
}

export type TestRecord = never

export enum UsersRoleOptions {
	"ADMIN" = "ADMIN",
	"USER" = "USER",
}
export type UsersRecord = {
	avatar?: string
	name?: string
	role: UsersRoleOptions
}

// Response types include system fields and match responses from the PocketBase API
export type PageBlocksResponse<Texpand = unknown> = Required<PageBlocksRecord> & BaseSystemFields<Texpand>
export type PollOptionsResponse<Texpand = unknown> = Required<PollOptionsRecord> & BaseSystemFields<Texpand>
export type PollVotesResponse<Texpand = unknown> = Required<PollVotesRecord> & BaseSystemFields<Texpand>
export type PollsResponse<Texpand = unknown> = Required<PollsRecord> & BaseSystemFields<Texpand>
export type TestResponse<Texpand = unknown> = Required<TestRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	page_blocks: PageBlocksRecord
	poll_options: PollOptionsRecord
	poll_votes: PollVotesRecord
	polls: PollsRecord
	test: TestRecord
	users: UsersRecord
}

export type CollectionResponses = {
	page_blocks: PageBlocksResponse
	poll_options: PollOptionsResponse
	poll_votes: PollVotesResponse
	polls: PollsResponse
	test: TestResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'page_blocks'): RecordService<PageBlocksResponse>
	collection(idOrName: 'poll_options'): RecordService<PollOptionsResponse>
	collection(idOrName: 'poll_votes'): RecordService<PollVotesResponse>
	collection(idOrName: 'polls'): RecordService<PollsResponse>
	collection(idOrName: 'test'): RecordService<TestResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
