export const applyProjectFilter = async (supabase: any, customization: any, filterState: any) => {
  try {
    let query = supabase
      .from('solutions')
      .select('id, best_practice_title, project_name, solution_summary, combined, conditions_for_replicability, sdgs_addressed, estimated_budget, atlas_award_id, regions, implementing_countries, original_id')
  
    const applyMultiFilter = (column:any, values:any) => {
      if (values && values.length > 0) {
        query = query.or(
          values.map((value:any) => `${column}.ilike.%${value}%`).join(',')
        )
      }
    }
  
    // Start a filter group for AND logic between different categories
    query = query.filter('id', 'not.is', null) // dummy filter to start the chain
    const arrayToCheck = [
      ...(customization.issues || []), 
      ...(customization.geographic || []),
      ...(customization.budget || []),
      ...(customization.special || []),
    ]
    // Apply filters for each category
    if (customization && customization.issues && customization.issues.length > 0) {
      applyMultiFilter('combined', arrayToCheck)
    }
    
    if (filterState.category && filterState.category.length > 0) {
      applyMultiFilter('combined', filterState.category)
    }
    if (filterState.budget && filterState.budget.length > 0) {
      applyMultiFilter('estimated_budget', filterState.budget)
    }
    if (filterState.challenges && filterState.challenges.length > 0) {
      applyMultiFilter('combined', filterState.challenges)
    }
    if (filterState.solutions && filterState.solutions.length > 0) {
      applyMultiFilter('combined', filterState.solutions)
    }
    if (filterState.expertise && filterState.expertise.length > 0) {
      applyMultiFilter('combined', filterState.expertise)
    }
    if (filterState.geographic && filterState.geographic.length > 0) {
      applyMultiFilter('conditions_for_replicability', filterState.geographic)
    }
    if (filterState.special && filterState.special.length > 0) {
      applyMultiFilter('conditions_for_replicability', filterState.special)
    }
    if (filterState.issues && filterState.issues.length > 0) {
      applyMultiFilter('combined', filterState.issues)
    }
    if (filterState.sdgs && filterState.sdgs.length > 0) {
      applyMultiFilter('sdgs_addressed', filterState.sdgs)
    }

    query = query.order("id", {
      ascending: true
    });

    const { data, error } = await query
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}