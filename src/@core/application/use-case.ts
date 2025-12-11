/**
 * UseCase interface - defines the contract for all use cases
 * Following Clean Architecture principles
 */
export interface IUseCase<TInput, TOutput> {
    execute(input: TInput): Promise<TOutput>;
}
